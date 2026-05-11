import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../modules/auth/guards/jwt_guard';
import { RolesGuard } from '../modules/auth/guards/roles_guard';
import { Roles } from '../modules/auth/decorators/roles_decorator';
import { ValidateDiscountDto } from './dto/validate_discounts_dto';
import { DiscountsService } from './discounts_services';

@Controller('discounts')
export class DiscountsController {
  constructor(private readonly service: DiscountsService) {}

  @Post('validate')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'SPONSOR')
  validate(@Body() dto: ValidateDiscountDto) {
    return this.service.validate(dto.code);
  }
}