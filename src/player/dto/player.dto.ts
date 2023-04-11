import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class PlayerData {
  @IsString()
  @IsNotEmpty()
  socketId: string;

  @IsString()
  @IsNotEmpty()
  roomId: string;
}
