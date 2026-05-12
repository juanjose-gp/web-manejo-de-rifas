import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Get,
  Patch,
  Param,
  Req,
} from '@nestjs/common';

import { diskStorage } from 'multer';
import { extname } from 'path';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

import { RafflesService } from './raffles_service';
import { JwtGuard } from '../auth/guards/jwt_guard';
import { RolesGuard } from '../auth/guards/roles_guard';
import { Roles } from '../auth/decorators/roles_decorator';

@Controller('raffles')
export class RafflesController {
  constructor(private readonly raffles_service: RafflesService) {}

  /* =========================
     PUBLIC - HOME
     ========================= */
  @Get()
  get_raffles() {
    return this.raffles_service.get_raffles();
  }

  /* =========================
     PUBLIC - VER RIFA
     ========================= */
  @Get(':id')
  get_raffle(@Param('id') id: string) {
    return this.raffles_service.get_raffle_for_selection(Number(id));
  }

  /* =========================
     ADMIN - CREAR RIFA
     ========================= */
  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: (_req, file, cb) => {
          if (file.fieldname === 'sticker_images') {
            cb(null, './uploads/stickers');
          } else {
            cb(null, './uploads/raffles');
          }
        },
        filename: (_req, file, cb) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
  )
  async create_raffle(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: any,
  ) {
    const raffleImage = files.find((f) => f.fieldname === 'image');
    const image_url = raffleImage
      ? `http://localhost:3000/uploads/raffles/${raffleImage.filename}`
      : null;

    let stickersData: any[] = [];
    if (body.stickers) {
      stickersData = JSON.parse(body.stickers);
    }

    const stickerImages = files.filter((f) => f.fieldname === 'sticker_images');

    const stickers = stickersData.map((sticker, index) => ({
      code: sticker.discount_code,
      description: sticker.discount_description,
      patrocinador: sticker.patrocinador,
      expiresAt: sticker.sticker_expiration
        ? new Date(sticker.sticker_expiration)
        : null,
      image_url: stickerImages[index]
        ? `http://localhost:3000/uploads/stickers/${stickerImages[index].filename}`
        : null,
    }));

    return this.raffles_service.create_raffle({
      title: body.title,
      description: body.description,
      ticket_price: Number(body.ticket_price),
      total_numbers: Number(body.total_numbers),
      image_url,
      stickers,
    });
  }

  /* =========================
     ADMIN - VER RIFAS
     ========================= */
  @Get('admin/raffles')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  get_admin_raffles() {
    return this.raffles_service.get_admin_raffles();
  }

  /* =========================
     ADMIN - ACT / DESACT
     ========================= */
  @Patch('admin/raffles/:id/toggle')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  toggle_raffle(@Param('id') id: string) {
    return this.raffles_service.toggle_raffle(Number(id));
  }

  /* =========================
     USER - RESERVAR NÚMEROS
     ========================= */
  @Post(':raffleId/reserve')
  reserve_numbers(
    @Param('raffleId') raffleId: string,
    @Body('numbers') numbers: number[],
  ) {
    return this.raffles_service.reserve_numbers(Number(raffleId), numbers);
  }

  /* =========================
     CHECKOUT - CONFIRMAR COMPRA
     ========================= */
  @Post(':raffleId/confirm-purchase')
  async confirmPurchase(
    @Param('raffleId') raffleId: string,
    @Body()
    body: {
      numbers: number[];
      buyer: { name: string; phone: string };
      stickerId?: number | null;
    },
  ) {
    return this.raffles_service.confirmPurchase(
      Number(raffleId),
      body.numbers,
      body.buyer,
      body.stickerId,
    );
  }
  @Post(':id/confirm-purchase-auto')
confirmPurchaseAuto(
  @Param('id') raffleId: string,
  @Body() body: { quantity: number; buyer: { name: string; phone: string } },
) {
  return this.raffles_service.confirmPurchaseAuto(
    Number(raffleId),
    body.quantity,
    body.buyer,
  );
}
}
