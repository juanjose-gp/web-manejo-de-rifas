import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma_service';
import { generateValidationCode } from '../../common/code';
import { MailService } from '../mail/mail_service';

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  // ========= CREAR PAGO EN WOMPI =========

  async createWompiPayment(purchaseId: number) {
    const purchase = await this.prisma.purchase.findUnique({
      where: { id: purchaseId },
    });

    if (!purchase) {
      throw new BadRequestException('Compra no encontrada');
    }

    if (purchase.status !== 'PENDING') {
      throw new BadRequestException('La compra no está pendiente de pago');
    }

    const response = await fetch(`${process.env.WOMPI_API_URL}/payment_links`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.WOMPI_PRIVATE_KEY}`,
      },
      body: JSON.stringify({
        name: `Pago rifa ${purchase.id}`,
        description: 'Compra de boletas',
        single_use: true,
        collect_shipping: false,
        currency: 'COP',
        amount_in_cents: purchase.totalAmount * 100,
        redirect_url: `http://localhost:5173/estado_pago?purchaseId=${purchase.id}`,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.error?.message || 'Error creando payment link');
    }

    const paymentLinkId = data.data.id;

    await this.prisma.payment.create({
      data: {
        provider: 'WOMPI',
        reference: paymentLinkId,
        amount: purchase.totalAmount,
        status: 'PENDING',
        purchase: { connect: { id: purchase.id } },
      },
    });

    return {
      checkoutUrl: `https://checkout.wompi.co/l/${paymentLinkId}`,
    };
  }

  //========= WEBHOOK WOMPI =========

  async handleWebhook(payload: any) {
    const transaction = payload?.data?.transaction;
    if (!transaction || transaction.status !== 'APPROVED') return;

    const paymentLinkId = transaction.payment_link_id;
    if (!paymentLinkId) return;

    const payment = await this.prisma.payment.findFirst({
      where: { reference: paymentLinkId },
      include: {
        purchase: {
          include: {
            raffle: true,
          },
        },
      },
    });

    if (!payment || !payment.purchase) return;
    if (payment.purchase.status === 'PAID') return;

    const purchase = payment.purchase;

    //== OBTENER DESCUENTO DE LA RIFA (si NO viene de manual) ==
    let discountCodeId = purchase.discountCodeId;

    if (!discountCodeId) {
      const raffleDiscount = await this.prisma.discountCode.findFirst({
        where: {
          raffleId: purchase.raffleId,
          isActive: true,
          OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
        },
      });

      if (raffleDiscount) {
        discountCodeId = raffleDiscount.id;
      }
    }

    //== GENERAR CÓDIGO DE VALIDACIÓN SOLO SI HAY DESCUENTO ==
    let validationCode: string | null = null;

    if (discountCodeId) {
      let unique = false;
      while (!unique) {
        const code = generateValidationCode(); // 4 dígitos
        const exists = await this.prisma.purchase.findFirst({
          where: { validationCode: code },
        });
        if (!exists) {
          validationCode = code;
          unique = true;
        }
      }
    }

    // === MARCAR PAGO Y COMPRA ===
    await this.prisma.payment.update({
      where: { id: payment.id },
      data: { status: 'APPROVED' },
    });

    await this.prisma.purchase.update({
      where: { id: purchase.id },
      data: {
        status: 'PAID',
        discountCodeId,
        validationCode,
      },
    });

    //=== VENDER TICKETS ===
    await this.prisma.ticket.updateMany({
      where: { purchaseId: purchase.id },
      data: {
        status: 'SOLD',
        reservedAt: null,
        expiresAt: null,
      },
    });

    // ===== OBTENER TICKETS =====
    const tickets = await this.prisma.ticket.findMany({
      where: { purchaseId: purchase.id },
      orderBy: { number: 'asc' },
    });

    // FORMATEAR NÚMEROS
    const numbers = tickets.map((t) =>
      String(t.number).padStart(
        purchase.raffle.total_numbers === 1000 ? 4 : 3,
        '0',
      ),
    );

    const discount = discountCodeId
      ? await this.prisma.discountCode.findUnique({
          where: { id: discountCodeId },
        })
      : null;

    // ===== ENVIAR EMAIL =====
    await this.mailService.sendPurchaseEmail(purchase.buyerEmail, {
      buyerName: purchase.buyerName,
      raffle: purchase.raffle.title,
      numbers,
      validationCode,
      code: discount?.code,
      description: discount?.description,
      patrocinador: discount?.patrocinador,
      expiresAt: discount?.expiresAt,
    });
    return { ok: true };
  }
}
