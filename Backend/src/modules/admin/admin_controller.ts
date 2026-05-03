import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt_guard';
import { RolesGuard } from '../auth/guards/roles_guard';
import { Roles } from '../auth/decorators/roles_decorator';
import { AdminService } from './admin_service';
import { CreateUserAdminDto } from './dto/create_user_admin_dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  get_dashboard() {
    return { message: 'Bienvenido ADMIN, acceso permitido' };
  }

  @Post('users')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  create_user(@Body() dto: CreateUserAdminDto) {
    return this.adminService.create_user(dto);
  }
}