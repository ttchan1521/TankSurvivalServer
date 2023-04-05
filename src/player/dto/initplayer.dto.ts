import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class PlayerInit {
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

    @IsString()
    @IsNotEmpty()
    mainColor: string;

    @IsString()
    @IsNotEmpty()
    subColor: string;
}