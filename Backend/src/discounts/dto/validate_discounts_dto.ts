import { IsString, Length } from 'class-validator';

export class ValidateDiscountDto {
  @IsString()
  @Length(4, 4)
  code!: string;
}