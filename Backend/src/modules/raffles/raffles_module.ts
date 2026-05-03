import { Module } from '@nestjs/common';
import { RafflesController } from './raffles_controller';
import { RafflesService } from './raffles_service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [RafflesController],
  providers: [RafflesService, PrismaService],
})
export class RafflesModule {}