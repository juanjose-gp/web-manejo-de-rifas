import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtGuard } from '../auth/guards/jwt_guard';
import { RolesGuard } from '../auth/guards/roles_guard';
import { Roles } from '../auth/decorators/roles_decorator';

@Controller('admin')
export class AdminController {

  @Get('dashboard')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  get_dashboard() {
    return {
      message: 'Bienvenido ADMIN, acceso permitido',
    };
  }
}
