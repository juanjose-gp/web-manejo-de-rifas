import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from '../prisma/prisma_module';
import { AdminModule } from './modules/admin/admin_module';
import { PaymentsModule } from './modules/payments/payments_module';
import { RafflesModule } from './modules/raffles/raffles_module';
import { ScheduleModule } from '@nestjs/schedule';
import { PurchasesModule } from './purchases/purchases_module';
import { DiscountsModule } from './discounts/discounts_module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'dev_secret',
      signOptions: { expiresIn: '1d' },
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    AdminModule,
    RafflesModule,
    PaymentsModule,
    PurchasesModule,
    DiscountsModule,
  ],
})
export class AppModule {}
