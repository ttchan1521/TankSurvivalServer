import { IsNotEmpty, IsString } from 'class-validator';

export class CollectibleData {
  @IsString()
  @IsNotEmpty()
  roomId: string;
}
