import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../../../prisma/prisma_module';
import { JwtStrategy } from './strategies/jwt_strategy';
import { JwtGuard } from './guards/jwt_guard';
import { RolesGuard } from './guards/roles_guard';

@Module({
  imports: [PrismaModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtGuard, RolesGuard],
})
export class AuthModule {}
