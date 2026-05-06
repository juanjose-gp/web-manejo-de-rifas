import { IsString } from 'class-validator';

export class ValidateDiscountDto {
  @IsString()
  code!: string;
}