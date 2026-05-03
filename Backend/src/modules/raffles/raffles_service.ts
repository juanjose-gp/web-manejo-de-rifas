import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RafflesService {
  constructor(private prisma: PrismaService) {}

  async get_raffles() {
    return this.prisma.raffle.findMany({
      orderBy: { id: 'desc' },
    });
  }

  async create_raffle(data: {
    title: string;
    description?: string;
    ticket_price: number;
    total_numbers: number;
    image_url?: string;
  }) {
    return this.prisma.raffle.create({
      data: {
        title: data.title,
        description: data.description,
        ticket_price: data.ticket_price,
        total_numbers: data.total_numbers,
        image_url: data.image_url,
      },
    });
  }
}