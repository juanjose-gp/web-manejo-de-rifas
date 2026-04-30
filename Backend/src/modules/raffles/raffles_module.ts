import { Module } from '@nestjs/common';
import { RafflesController } from './raffles_controller';
import { RafflesService } from './raffles_service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RafflesController],
  providers: [RafflesService],
})
export class RafflesModule {}