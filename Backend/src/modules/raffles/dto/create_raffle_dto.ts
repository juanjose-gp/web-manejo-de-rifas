import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateRaffleDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  ticket_price!: number;

  @IsNumber()
  total_numbers!: number;
}
