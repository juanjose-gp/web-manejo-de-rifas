import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt_guard';
import { RolesGuard } from '../auth/guards/roles_guard';
import { Roles } from '../auth/decorators/roles_decorator';
import { RafflesService } from './raffles_service';
import { CreateRaffleDto } from './dto/create_raffle_dto';
import { Get } from '@nestjs/common';

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
  create_raffle(@Body() dto: CreateRaffleDto) {
    return this.raffles_service.create_raffle(dto);
  }
}
