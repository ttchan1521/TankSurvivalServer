import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayerData } from './dto/player.dto';

@Injectable()
export class PlayerService {
  create(createPlayerDto: CreatePlayerDto) {
    return 'This action adds a new player';
  }

  play(playerData: PlayerData) {
    const room = playerData.roomId;
  }

  findAll() {
    return `This action returns all player`;
  }

  findOne(id: number) {
    return `This action returns a #${id} player`;
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return `This action updates a #${id} player`;
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
  }
}
