import { Module } from '@nestjs/common';
import { RafflesController } from './raffles_controller';
import { RafflesService } from './raffles_service';
import { PrismaService } from '../../../prisma/prisma_service';
import { RafflesCleanupService } from './raffles_cleanup';



@Module({
  controllers: [RafflesController],
  providers: [RafflesService, PrismaService,RafflesCleanupService],
})
export class RafflesModule {}