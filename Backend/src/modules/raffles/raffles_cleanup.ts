import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../../../prisma/prisma_service';

@Injectable()
export class RafflesCleanupService {
  constructor(private prisma: PrismaService) {}

  @Cron('*/15 * * * * *')
  async releaseExpiredReservations() {
    const now = new Date();

    const result = await this.prisma.ticket.updateMany({
      where: {
        status: 'RESERVED',
        expiresAt: {
          lt: now,
        },
      },
      data: {
        status: 'AVAILABLE',
        reservedAt: null,
        expiresAt: null,
        userId: null,
        purchaseId: null,
      },
    });

    if (result.count > 0) {
      console.log(`[CRON] Reservas liberadas automáticamente: ${result.count}`);
    }
  }
}