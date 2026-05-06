import { Injectable } from '@nestjs/common';
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
  async create_raffle(data: {
    title: string;
    description?: string;
    ticket_price: number;
    total_numbers: number;
    image_url?: string;
  }) {
    return this.prisma.raffle.create({
      data,
    });
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
}
