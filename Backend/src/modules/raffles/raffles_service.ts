import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma_service';

@Injectable()
export class RafflesService {
  constructor(private prisma: PrismaService) {}

  /* =========================
     HOME - RIFAS PÚBLICAS
     ========================= */
  async get_raffles() {
    return this.prisma.raffle.findMany({
      where: {
        is_active: true,
      },
      orderBy: { id: 'desc' },
    });
  }

  /* =========================
     ADMIN - CREAR RIFA
     ========================= */
  async create_raffle(data: any) {
    const raffle = await this.prisma.raffle.create({
      data: {
        title: data.title,
        description: data.description,
        ticket_price: Number(data.ticket_price),
        total_numbers: Number(data.total_numbers),
        image_url: data.image_url,
      },
    });

    /* =========================
     VALIDACIÓN DE NEGOCIO
     ========================= */
    if (
      data.total_numbers === 1000 &&
      data.stickers &&
      data.stickers.length > 1
    ) {
      throw new Error('Las rifas de 1000 números solo pueden tener un sticker');
    }

    /* =========================
     CREAR TODOS LOS STICKERS
     ========================= */
    if (Array.isArray(data.stickers)) {
      for (const sticker of data.stickers) {
        await this.prisma.discountCode.create({
          data: {
            code: sticker.code,
            description: sticker.description,
            image_url: sticker.image_url,
            expiresAt: sticker.expiresAt,
            raffleId: raffle.id,
            isActive: true,
          },
        });
      }
    }

    return raffle;
  }

  /* =========================
     ADMIN - VER TODAS LAS RIFAS
     ========================= */
  async get_admin_raffles() {
    return this.prisma.raffle.findMany({
      orderBy: { id: 'desc' },
      include: {
        tickets: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }

  /* =========================
     ADMIN - ACT / DESACT
     ========================= */
  async toggle_raffle(id: number) {
    const raffle = await this.prisma.raffle.findUnique({
      where: { id },
    });

    if (!raffle) {
      throw new Error('Rifa no encontrada');
    }

    return this.prisma.raffle.update({
      where: { id },
      data: { is_active: !raffle.is_active },
    });
  }

  /* =========================
   USER - RESERVAR NÚMEROS
   ========================= */
  async reserve_numbers(raffleId: number, userId: number, numbers: number[]) {
    if (!numbers || numbers.length === 0) {
      throw new BadRequestException('No se enviaron números a reservar');
    }

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutos

    return this.prisma.$transaction(async (tx) => {
      // 1. Verificar rifa
      const raffle = await tx.raffle.findUnique({
        where: { id: raffleId },
      });

      if (!raffle) {
        throw new BadRequestException('Rifa no encontrada');
      }

      // 2. Validar rango de números
      const invalidNumber = numbers.some(
        (n) => n < 1 || n > raffle.total_numbers,
      );

      if (invalidNumber) {
        throw new BadRequestException(
          'Uno o más números están fuera del rango permitido',
        );
      }

      // 3. Buscar conflictos (reservados o vendidos)
      const conflicts = await tx.ticket.findMany({
        where: {
          raffleId,
          number: { in: numbers },
          OR: [
            { status: 'SOLD' },
            {
              status: 'RESERVED',
              expiresAt: { gt: now },
            },
          ],
        },
      });

      if (conflicts.length > 0) {
        throw new BadRequestException(
          'Uno o más números ya no están disponibles',
        );
      }

      // 4. Reservar números
      for (const number of numbers) {
        await tx.ticket.upsert({
          where: {
            raffleId_number: {
              raffleId,
              number,
            },
          },
          update: {
            status: 'RESERVED',
            userId,
            reservedAt: now,
            expiresAt,
          },
          create: {
            raffleId,
            number,
            status: 'RESERVED',
            userId,
            reservedAt: now,
            expiresAt,
          },
        });
      }

      return {
        success: true,
        expiresAt,
      };
    });
  }

  /* =========================
   SYSTEM - LIBERAR RESERVAS VENCIDAS
   ========================= */
  async release_expired_reservations() {
    const now = new Date();

    const result = await this.prisma.ticket.updateMany({
      where: {
        status: 'RESERVED',
        expiresAt: {
          lt: now,
        },
      },
      data: {
        status: 'AVAILABLE',
        userId: null,
        reservedAt: null,
        expiresAt: null,
      },
    });

    return result.count;
  }

  /* =========================
   USER - CONFIRMAR COMPRA
   ========================= */
  async confirm_purchase(
    raffleId: number,
    userId: number,
    numbers: number[],
    paymentId: number,
  ) {
    if (!numbers || numbers.length === 0) {
      throw new BadRequestException('No se enviaron números');
    }

    if (!paymentId) {
      throw new BadRequestException('paymentId es obligatorio');
    }

    const now = new Date();

    return this.prisma.$transaction(async (tx) => {
      // 1️⃣ Verificar rifa
      const raffle = await tx.raffle.findUnique({
        where: { id: raffleId },
      });

      if (!raffle) {
        throw new BadRequestException('Rifa no encontrada');
      }

      // 2️⃣ Verificar pago
      const payment = await tx.payment.findUnique({
        where: { id: paymentId },
      });

      if (!payment) {
        throw new BadRequestException('El pago no existe');
      }

      // (opcional, si usas status)
      if (payment.status !== 'APPROVED') {
        throw new BadRequestException('El pago no está aprobado');
      }

      // 3️⃣ Buscar tickets reservados válidos
      const tickets = await tx.ticket.findMany({
        where: {
          raffleId,
          number: { in: numbers },
          userId,
          status: 'RESERVED',
          expiresAt: { gt: now },
        },
      });

      if (tickets.length !== numbers.length) {
        throw new BadRequestException(
          'Uno o más números no están reservados o la reserva expiró',
        );
      }

      // 4️⃣ Confirmar venta
      await tx.ticket.updateMany({
        where: {
          id: { in: tickets.map((t) => t.id) },
        },
        data: {
          status: 'SOLD',
          paymentId,
          reservedAt: null,
          expiresAt: null,
        },
      });

      return {
        success: true,
        ticketsSold: tickets.length,
      };
    });
  }
  async get_raffle_for_selection(id: number) {
  return this.prisma.raffle.findUnique({
    where: { id },
    include: {
      tickets: true,
      discountCodes: {
        where: {
          isActive: true,
        },
        orderBy: { createdAt: 'asc' },
      },
    },
  });
}
}
