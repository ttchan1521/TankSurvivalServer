import { IsNotEmpty, IsString } from 'class-validator';

export class UnitData {
  @IsString()
  @IsNotEmpty()
  socketId: string;

  @IsString()
  @IsNotEmpty()
  roomId: string;
}
