import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, Min } from 'class-validator';

export class ListChatDto {
  @IsNumber()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  page: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  perPage: number;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  pagination: boolean;
}
