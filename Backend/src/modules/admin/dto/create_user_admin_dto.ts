import { IsEmail, IsString, IsEnum, MinLength } from 'class-validator';

export class CreateUserAdminDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  phone!: string;

  @MinLength(6)
  password!: string;

  @IsEnum(['ADMIN', 'USER', 'SPONSOR'])
  role!: 'ADMIN' | 'USER' | 'SPONSOR';
}