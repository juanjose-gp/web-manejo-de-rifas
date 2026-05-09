import { IsNumber, IsString } from 'class-validator';

export class ValidateDiscountDto {
  @IsNumber()
  raffleId!: number;

  @IsString()
  code!: string;
}