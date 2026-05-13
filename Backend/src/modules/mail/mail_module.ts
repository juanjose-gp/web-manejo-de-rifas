import { Module } from '@nestjs/common';
import { MailService } from './mail_service';

@Module({
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
