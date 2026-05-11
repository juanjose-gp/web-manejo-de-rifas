import { Module } from '@nestjs/common';
import { PurchasesController } from './purchases_controller';
import { PrismaService } from '../../prisma/prisma_service';

@Module({
  controllers: [PurchasesController],
  providers: [PrismaService],
})
export class PurchasesModule {}
