import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt_guard';
import { RolesGuard } from '../auth/guards/roles_guard';
import { Roles } from '../auth/decorators/roles_decorator';
import { AdminService } from './admin_service';
import { CreateUserAdminDto } from './dto/create_user_admin_dto';

@Controller('admin')
@UseGuards(JwtGuard, RolesGuard)
@Roles('ADMIN')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /* ========= DASHBOARD ADMIN ========= */
  @Get('dashboard')
  get_dashboard() {
    return { message: 'Bienvenido ADMIN, acceso permitido' };
  }

  /* ========= CREAR ADMIN / USER ========= */
  @Post('users')
  create_user(@Body() dto: CreateUserAdminDto) {
    return this.adminService.create_user(dto);
  }

  /* ========= CREAR PATROCINADOR ========= */
  @Post('sponsors')
  create_sponsor(@Body() dto: CreateUserAdminDto) {
    return this.adminService.create_sponsor(dto);
  }
}