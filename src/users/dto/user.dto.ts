import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  password: string;
}

export class UpdateUserScoreDto {
  @IsNumber()
  @Min(0)
  score: number;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  mode: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  operator: string;
}

export class ListUserDto {
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

export class ListUserModeDto extends PartialType(ListUserDto) {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  mode: string;
}

export class UserRankDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  mode: string;
}

export class UserDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  userId: string;
}
