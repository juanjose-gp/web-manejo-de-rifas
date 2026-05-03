import { Module } from '@nestjs/common';
import { AdminController } from './admin_controller';
import { AdminService } from './admin_service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
