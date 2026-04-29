import { Module } from '@nestjs/common';
import { AdminController } from './admin_controller';

@Module({
  controllers: [AdminController],
})
export class AdminModule {}
