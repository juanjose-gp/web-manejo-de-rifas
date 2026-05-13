import { Controller, Get, Param } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma_service';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly prisma: PrismaService) {}

  //=== Obtener una compra con toda su info ===

  @Get(':id')
  async getPurchase(@Param('id') id: string) {
    return this.prisma.purchase.findUnique({
      where: { id: Number(id) },
      include: {
        raffle: {
          select: {
            id: true,
            title: true,
          },
        },
        tickets: {
          select: {
            number: true,
            status: true,
          },
        },
        discountCode: {
          select: {
            id: true,
            code: true,
            description: true,
            image_url: true,
            expiresAt: true,
          },
        },
      },
    });
  }

  @Get('validation/:id')
  async checkValidation(@Param('id') id: string) {
    const purchase = await this.prisma.purchase.findUnique({
      where: { id: Number(id) },
      select: {
        validationCode: true,
      },
    });

    return {
      approved: Boolean(purchase?.validationCode),
    };
  }
}
