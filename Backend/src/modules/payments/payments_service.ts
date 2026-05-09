import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma_service';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  /* =========================
     CREAR PAGO SIMULADO
     ========================= */
  async create_payment(data: {
    reference: string;
    amount: number;
    status: 'APPROVED' | 'REJECTED';
  }) {
    const { reference, amount, status } = data;

    if (!reference || !amount || !status) {
      throw new BadRequestException('Datos incompletos para el pago');
    }

    if (amount <= 0) {
      throw new BadRequestException('El monto debe ser mayor a 0');
    }

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      throw new BadRequestException('Estado de pago inválido');
    }

    const payment = await this.prisma.payment.create({
      data: {
        reference,
        amount,
        status,
      },
    });

    return {
      id: payment.id,
      status: payment.status,
    };
  }
}