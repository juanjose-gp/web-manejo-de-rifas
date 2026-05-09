import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma_service';

@Injectable()
export class DiscountsService {
  constructor(private prisma: PrismaService) {}

  async validate(raffleId: number, code: string) {
    const discount = await this.prisma.discountCode.findUnique({
      where: {
        raffleId_code: {
          raffleId,
          code,
        },
      },
    });

    if (!discount) {
      throw new BadRequestException('Código inválido');
    }

    if (!discount.isActive || discount.usedAt) {
      throw new BadRequestException('Código ya usado o inactivo');
    }

    return { valid: true };
  }
}
