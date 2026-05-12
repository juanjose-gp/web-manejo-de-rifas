import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma_service';
import { generateValidationCode } from '../../common/code';

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
    return this.prisma.$transaction(async (tx) => {
      const totalNumbers = Number(data.total_numbers);

      // Validación explícita del tipo de rifa
      if (totalNumbers !== 100 && totalNumbers !== 1000) {
        throw new BadRequestException(
          'total_numbers debe ser 100 (manual) o 1000 (automática)',
        );
      }

      //  Crear la rifa
      const raffle = await tx.raffle.create({
        data: {
          title: data.title,
          description: data.description,
          ticket_price: Number(data.ticket_price),
          total_numbers: totalNumbers,
          image_url: data.image_url ?? null,
          is_active: true,
        },
      });

      //  Crear boletas según el tipo
      const tickets: {
        raffleId: number;
        number: number;
        status: 'AVAILABLE';
      }[] = [];
      for (let i = 1; i <= totalNumbers; i++) {
        tickets.push({
          raffleId: raffle.id,
          number: i,
          status: 'AVAILABLE',
        });
      }

      await tx.ticket.createMany({
        data: tickets,
      });

      // Crear los stickers asociados (SIN CAMBIOS)
      if (Array.isArray(data.stickers)) {
        for (const sticker of data.stickers) {
          await tx.discountCode.create({
            data: {
              code: sticker.code,
              description: sticker.description,
              patrocinador: sticker.patrocinador ?? null,
              image_url: sticker.image_url,
              expiresAt: sticker.expiresAt,
              raffleId: raffle.id,
              isActive: true,
            },
          });
        }
      }

      return raffle;
    });
  }

  async get_admin_raffles() {
    return this.prisma.raffle.findMany({
      orderBy: { id: 'desc' },
      include: {
        purchases: {
          include: {
            tickets: true,
            discountCode: true,
          },
        },
      },
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
  async reserve_numbers(raffleId: number, numbers: number[]) {
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
      if (!raffle) throw new BadRequestException('Rifa no encontrada');

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

      /* =========================
       GENERAR CÓDIGO DE VALIDACIÓN
       ========================= */
      let validationCode: string | null = null;

      if (stickerId) {
        let unique = false;

        while (!unique) {
          const code = generateValidationCode();

          const exists = await tx.purchase.findFirst({
            where: { validationCode: code },
          });

          if (!exists) {
            validationCode = code;
            unique = true;
          }
        }
      }

      /* =========================
       CREAR COMPRA
       ========================= */
      /* =========================
   CREAR COMPRA
   ========================= */
      const purchase = await tx.purchase.create({
        data: {
          raffleId,
          buyerName: buyer.name,
          buyerPhone: buyer.phone,
          buyerEmail: buyer.email ?? null,
          totalAmount,
          status: 'PENDING', // ✅ SIEMPRE PENDING
          discountCodeId: stickerId ?? null,
        },
      });

      // ✅ SOLO ASOCIAR, NO vender
      await tx.ticket.updateMany({
        where: { id: { in: tickets.map((t) => t.id) } },
        data: {
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
  async confirmPurchaseAuto(
    raffleId: number,
    quantity: number,
    buyer: { name: string; phone: string },
  ) {
    if (!quantity || quantity <= 0) {
      throw new BadRequestException('Cantidad inválida');
    }

    if (!buyer?.name || !buyer?.phone) {
      throw new BadRequestException('Datos del comprador incompletos');
    }

    const now = new Date();

    return this.prisma.$transaction(async (tx) => {
      const raffle = await tx.raffle.findUnique({
        where: { id: raffleId },
      });

      if (!raffle) {
        throw new BadRequestException('Rifa no encontrada');
      }

      // ✅ Esta ruta SOLO es válida para rifas automáticas
      if (raffle.total_numbers !== 1000) {
        throw new BadRequestException('Esta rifa no es automática');
      }

      /*
      ✅ 1. Obtener números YA USADOS
      (tickets existentes)
    */
      const existingTickets = await tx.ticket.findMany({
        where: { raffleId },
        select: { number: true },
      });

      const usedNumbers = new Set(existingTickets.map((t) => t.number));

      /*
      ✅ 2. Validar disponibilidad real
    */
      if (usedNumbers.size + quantity > 1000) {
        throw new BadRequestException('No hay suficientes boletas disponibles');
      }

      /*
      ✅ 3. Elegir números aleatorios NO usados
    */
      const selectedNumbers: number[] = [];

      while (selectedNumbers.length < quantity) {
        const randomNumber = Math.floor(Math.random() * 1000) + 1; // 1–1000

        if (!usedNumbers.has(randomNumber)) {
          usedNumbers.add(randomNumber);
          selectedNumbers.push(randomNumber);
        }
      }

      /*
      ✅ 4. Crear Purchase (PENDING)
    */
      const purchase = await tx.purchase.create({
        data: {
          raffleId,
          buyerName: buyer.name,
          buyerPhone: buyer.phone,
          totalAmount: raffle.ticket_price * quantity,
          status: 'PENDING',
        },
      });

      /*
      ✅ 5. Crear y RESERVAR tickets (igual que manual)
    */
      for (const number of selectedNumbers) {
        await tx.ticket.create({
          data: {
            raffleId,
            number,
            status: 'RESERVED',
            reservedAt: now,
            purchaseId: purchase.id,
          },
        });
      }

      return {
        success: true,
        purchaseId: purchase.id,
        quantity,
      };
    });
  }
}
