import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class PlayerData {
    @IsString()
    @IsNotEmpty()
    socketId: string;

    @IsString()
    @IsNotEmpty()
    roomId: string;

    @IsArray()
    @IsNotEmpty()
    position: Array<number>;

    @IsArray()
    @IsNotEmpty()
    rotation: Array<number>;

    @IsArray()
    @IsNotEmpty()
    turretRotation: Array<number>;
}