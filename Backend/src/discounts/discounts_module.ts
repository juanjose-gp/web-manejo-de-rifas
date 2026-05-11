import { Module } from '@nestjs/common';
import { DiscountsController } from './discounts_controller';
import { DiscountsService } from './discounts_services';
import { PrismaService } from '../../prisma/prisma_service';

@Module({
  controllers: [DiscountsController],
  providers: [DiscountsService, PrismaService],
})
export class DiscountsModule {}