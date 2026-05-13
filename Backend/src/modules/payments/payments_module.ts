import { Module } from '@nestjs/common';
import { PaymentsController } from './payments_controller';
import { PaymentsService } from './payments_service';
import { PrismaService } from '../../../prisma/prisma_service';
import { MailModule } from '../mail/mail_module';

@Module({
  imports: [MailModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, PrismaService],
})
export class PaymentsModule {}
