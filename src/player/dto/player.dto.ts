import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class PlayerData {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  roomId: string;
}
