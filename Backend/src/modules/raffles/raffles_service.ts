import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRaffleDto } from './dto/create_raffle_dto';

@Injectable()
export class RafflesService {
  constructor(private readonly prisma: PrismaService) {}

  async create_raffle(dto: CreateRaffleDto) {
    return this.prisma.raffle.create({
      data: {
        title: dto.title,
        description: dto.description,
        ticket_price: dto.ticket_price,
        total_numbers: dto.total_numbers,
      },
    });
  }
  async get_raffles() {
  return this.prisma.raffle.findMany({
    where: {
      is_active: true,
    },
    orderBy: {
      created_at: 'desc',
    },
  });
}
}
