import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma_service';

@Injectable()
export class RafflesService {
  constructor(private prisma: PrismaService) {}

  /* =========================
     PUBLIC - HOME
     ========================= */
  async get_raffles() {
    return this.prisma.raffle.findMany({
      where: { is_active: true },
      orderBy: { id: 'desc' },
    });
  }

  async get_raffle_for_selection(id: number) {
    return this.prisma.raffle.findUnique({
      where: { id },
      include: {
        tickets: true,
        discountCodes: {
          where: { isActive: true },
          orderBy: { createdAt: 'asc' },
        },
      },
    });
  }

  /* =========================
     ADMIN
     ========================= */
  async create_raffle(data: any) {
    return this.prisma.raffle.create({ data });
  }

  async get_admin_raffles() {
    return this.prisma.raffle.findMany({
      orderBy: { id: 'desc' },
      include: { tickets: true },
    });
  }

  async toggle_raffle(id: number) {
    const raffle = await this.prisma.raffle.findUnique({ where: { id } });
    if (!raffle) throw new BadRequestException('Rifa no encontrada');

    return this.prisma.raffle.update({
      where: { id },
      data: { is_active: !raffle.is_active },
    });
  }

  /* =========================
     USER - RESERVAR
     ========================= */
  async reserve_numbers(
  raffleId: number,
  numbers: number[],
) 
 {
    if (!numbers.length)
      throw new BadRequestException('No se enviaron números');

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 5 * 60 * 1000);

    return this.prisma.$transaction(async (tx) => {
      for (const number of numbers) {
        await tx.ticket.upsert({
          where: { raffleId_number: { raffleId, number } },
          update: {
            status: 'RESERVED',
            reservedAt: now,
            expiresAt,
          },
          create: {
            raffleId,
            number,
            status: 'RESERVED',
            reservedAt: now,
            expiresAt,
          },
        });
      }
      return { success: true, expiresAt };
    });
  }

  /* =========================
     CHECKOUT - CONFIRMAR COMPRA
     ========================= */
  async confirmPurchase(
    raffleId: number,
    numbers: number[],
    buyer: {
      name: string;
      phone: string;
      email?: string;
    },
    stickerId?: number | null,
  ) {
    if (!numbers.length)
      throw new BadRequestException('No se enviaron números');

    if (!buyer?.name || !buyer?.phone)
      throw new BadRequestException('Datos del comprador incompletos');

    const now = new Date();

    return this.prisma.$transaction(async (tx) => {
      const raffle = await tx.raffle.findUnique({
        where: { id: raffleId },
      });
      if (!raffle)
        throw new BadRequestException('Rifa no encontrada');

      const tickets = await tx.ticket.findMany({
        where: {
          raffleId,
          number: { in: numbers },
          status: 'RESERVED',
          expiresAt: { gt: now },
        },
      });

      if (tickets.length !== numbers.length)
        throw new BadRequestException('Números no válidos');

      const totalAmount = raffle.ticket_price * numbers.length;

      const purchase = await tx.purchase.create({
        data: {
          raffleId,
          buyerName: buyer.name,
          buyerPhone: buyer.phone,
          buyerEmail: buyer.email,
          totalAmount,
          status: 'PAID',
          discountCodeId: stickerId ?? null
        },
      });

      await tx.ticket.updateMany({
        where: { id: { in: tickets.map((t) => t.id) } },
        data: {
          status: 'SOLD',
          reservedAt: null,
          expiresAt: null,
          purchaseId: purchase.id,
        },
      });

      return {
        success: true,
        purchaseId: purchase.id,
        raffle: raffle.title,
        numbers,
        buyer,
        totalAmount,
      };
    });
  }
}
