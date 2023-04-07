import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PvpService } from './pvp.service';
import { CreatePvpDto } from './dto/create-pvp.dto';
import { UpdatePvpDto } from './dto/update-pvp.dto';

@WebSocketGateway()
export class PvpGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly pvpService: PvpService) {}

  @SubscribeMessage('createPvp')
  create(
    @ConnectedSocket() client: Socket,
    @MessageBody() createPvpDto: CreatePvpDto,
  ) {
    return this.pvpService.create(this.server, client, createPvpDto);
  }

  @SubscribeMessage('findAllPvp')
  findAll() {
    return this.pvpService.findAll();
  }

  @SubscribeMessage('findOnePvp')
  findOne(@MessageBody() id: number) {
    return this.pvpService.findOne(id);
  }

  @SubscribeMessage('updatePvp')
  update(@MessageBody() updatePvpDto: UpdatePvpDto) {
    return this.pvpService.update(updatePvpDto.id, updatePvpDto);
  }

  @SubscribeMessage('removePvp')
  remove(@MessageBody() id: number) {
    return this.pvpService.remove(id);
  }
}
