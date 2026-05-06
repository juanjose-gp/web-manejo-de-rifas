import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from '../prisma/prisma_module';
import { AdminModule } from './modules/admin/admin_module';

import { RafflesModule } from './modules/raffles/raffles_module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'dev_secret',
      signOptions: { expiresIn: '1d' },
    }),

    PrismaModule,
    AuthModule,
    AdminModule,
    RafflesModule,
  ],
})
export class AppModule {}
