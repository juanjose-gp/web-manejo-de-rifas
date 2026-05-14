import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma_service';

@Injectable()
export class DiscountsService {
  constructor(private prisma: PrismaService) {}

  async validate(code: string) {
    const purchase = await this.prisma.purchase.findFirst({
      where: { validationCode: code },
      include: {
        discountCode: true,
      },
    });

    if (!purchase) {
      throw new BadRequestException('Código inválido');
    }

    if (purchase.validationCodeUsedAt) {
      throw new BadRequestException('Este código ya fue utilizado');
    }

    if (
      purchase.discountCode?.expiresAt &&
      purchase.discountCode.expiresAt < new Date()
    ) {
      throw new BadRequestException('El descuento está vencido');
    }

    // Marcar como usado
    await this.prisma.purchase.update({
      where: { id: purchase.id },
      data: {
        validationCodeUsedAt: new Date(),
      },
    });

    return {
      valid: true,
      buyer: purchase.buyerName,
      email: purchase.buyerEmail,
      phone: purchase.buyerPhone,
      discount: purchase.discountCode?.code,
      patrocinador: purchase.discountCode?.patrocinador,
      usedAt: new Date(),
    };
  }
}
