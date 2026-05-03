import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserAdminDto } from './dto/create_user_admin_dto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async create_user(dto: CreateUserAdminDto) {
    const exists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (exists) {
      throw new BadRequestException('El email ya existe');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        password: hashedPassword,
        role: dto.role,
      },
    });
  }
}
