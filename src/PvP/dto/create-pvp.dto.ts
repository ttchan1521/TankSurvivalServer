import { IsInt, IsNotEmpty } from 'class-validator';

export class CreatePvpDto {
  @IsInt()
  @IsNotEmpty()
  landSpawn: number;
}
