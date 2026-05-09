import { Module } from '@nestjs/common';
import { PaymentsController } from './payments_controller';
import { PaymentsService } from './payments_service';
import { PrismaService } from '../../../prisma/prisma_service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, PrismaService],
})
export class PaymentsModule {}