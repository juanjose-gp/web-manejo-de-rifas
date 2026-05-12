import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments_service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // ✅ ENDPOINT QUE FALTABA
  @Post('create')
  createPayment(@Body('purchaseId') purchaseId: number) {
    return this.paymentsService.createWompiPayment(purchaseId);
  }

  // ✅ WEBHOOK
  @Post('webhook')
  handleWebhook(@Body() payload: any) {
    console.log(
      'WEBHOOK WOMPI RECIBIDO:',
      payload?.data?.payment_link?.id,
      payload?.data?.transaction?.status,
    );
    return this.paymentsService.handleWebhook(payload);
  }
}
