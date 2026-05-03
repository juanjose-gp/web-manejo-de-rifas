import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Get,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { RafflesService } from './raffles_service';
import { JwtGuard } from '../auth/guards/jwt_guard';
import { RolesGuard } from '../auth/guards/roles_guard';
import { Roles } from '../auth/decorators/roles_decorator';
import { CreateRaffleDto } from './dto/create_raffle_dto';

@Controller('raffles')
export class RafflesController {
  constructor(private readonly raffles_service: RafflesService) {}

  @Get()
  get_raffles() {
    return this.raffles_service.get_raffles();
  }

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/raffles',
        filename: (_req, file, cb) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
  )
  create_raffle(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateRaffleDto,
  ) {
    const image_url = file
      ? `http://localhost:3000/uploads/raffles/${file.filename}`
      : undefined;

    return this.raffles_service.create_raffle({
      title: dto.title,
      description: dto.description,
      ticket_price: Number(dto.ticket_price),
      total_numbers: Number(dto.total_numbers),
      image_url,
    });
  }
}
