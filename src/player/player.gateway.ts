import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayerData } from './dto/player.dto';
import { PlayerInit } from './dto/initplayer.dto';

@WebSocketGateway()
export class PlayerGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly playerService: PlayerService) {}

  @SubscribeMessage('createPlayer')
  create(@MessageBody() createPlayerDto: CreatePlayerDto) {
    return this.playerService.create(createPlayerDto);
  }

  @SubscribeMessage('player play')
  play(
    @ConnectedSocket() client: Socket,
    @MessageBody() playerData: PlayerInit) {
    const room = playerData.roomId;
    client.broadcast.to(room).emit("other player play", playerData);
    //return this.playerService.play(playerData);
  }

  @SubscribeMessage('player move')
  move(
    @ConnectedSocket() client: Socket,
    @MessageBody() playerData: PlayerData
  ) {
    const room = playerData.roomId;
    client.broadcast.to(room).emit("other player move", playerData);
  }
  @SubscribeMessage('findAllPlayer')
  findAll() {
    return this.playerService.findAll();
  }

  @SubscribeMessage('findOnePlayer')
  findOne(@MessageBody() id: number) {
    return this.playerService.findOne(id);
  }

  @SubscribeMessage('updatePlayer')
  update(@MessageBody() updatePlayerDto: UpdatePlayerDto) {
    return this.playerService.update(updatePlayerDto.id, updatePlayerDto);
  }

  @SubscribeMessage('removePlayer')
  remove(@MessageBody() id: number) {
    return this.playerService.remove(id);
  }
}
