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
} from '@nestjs/common';

import {
  FileInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { RafflesService } from './raffles_service';
import { JwtGuard } from '../auth/guards/jwt_guard';
import { RolesGuard } from '../auth/guards/roles_guard';
import { Roles } from '../auth/decorators/roles_decorator';
import { CreateRaffleDto } from './dto/create_raffle_dto';
import { Req } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

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
        const uniqueName =
          Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueName + extname(file.originalname));
      },
    }),
  }),
)
async create_raffle(
  @UploadedFiles() files: Express.Multer.File[],
  @Body() body: any,
) {
  try {
    // ✅ Imagen principal
    const raffleImage = files.find(f => f.fieldname === 'image');
    const image_url = raffleImage
      ? `http://localhost:3000/uploads/raffles/${raffleImage.filename}`
      : null;

    // ✅ Imágenes de stickers
    const stickerImages = files.filter(
      f => f.fieldname === 'sticker_images'
    );

    // ✅ Metadata stickers (PROTEGIDO)
    let stickersData: any[] = [];
    if (body.stickers) {
      try {
        stickersData = JSON.parse(body.stickers);
      } catch (e) {
        throw new Error('Formato inválido de stickers');
      }
    }

    // ✅ Unir metadata + imágenes por índice
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

  } catch (error) {
    console.error('❌ Error creando rifa:', error);
    throw error;
  }
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
     ADMIN - ACTIVAR / DESACTIVAR
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
  @UseGuards(JwtGuard)
  async reserve_numbers(
    @Param('raffleId') raffleId: string,
    @Body('numbers') numbers: number[],
    @Req() req: any,
  ) {
    return this.raffles_service.reserve_numbers(
      Number(raffleId),
      req.user.id,
      numbers,
    );
  }
  @Post(':raffleId/confirm')
  @UseGuards(JwtGuard)
  async confirm_purchase(
    @Param('raffleId') raffleId: string,
    @Body('numbers') numbers: number[],
    @Body('paymentId') paymentId: number,
    @Req() req: any,
  ) {
    return this.raffles_service.confirm_purchase(
      Number(raffleId),
      req.user.id,
      numbers,
      paymentId,
    );
  }

  @Get(':id')
  get_raffle(@Param('id') id: string) {
    return this.raffles_service.get_raffle_for_selection(Number(id));
  }
}
