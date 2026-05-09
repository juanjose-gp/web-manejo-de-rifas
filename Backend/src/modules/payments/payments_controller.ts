import {
  Controller,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments_service';
import { JwtGuard } from '../auth/guards/jwt_guard';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  /* =========================
     USER - CREAR PAGO (SIMULADO)
     ========================= */
  @Post()
  @UseGuards(JwtGuard)
  create_payment(
    @Body('reference') reference: string,
    @Body('amount') amount: number,
    @Body('status') status: 'APPROVED' | 'REJECTED',
  ) {
    return this.paymentsService.create_payment({
      reference,
      amount,
      status,
    });
  }
}