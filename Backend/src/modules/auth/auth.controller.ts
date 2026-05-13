import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create_user_dto';
import { LoginDto } from './dto/login_dto';
import { UseGuards, Get, Req } from '@nestjs/common';
import { JwtGuard } from './guards/jwt_guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  me(@Req() req: any) {
    return req.user;
  }
}
