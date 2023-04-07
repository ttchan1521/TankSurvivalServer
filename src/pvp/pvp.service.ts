import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { CreatePvpDto } from './dto/create-pvp.dto';
import { UpdatePvpDto } from './dto/update-pvp.dto';

@Injectable()
export class PvpService {
  clients: Socket[] = [];

  create(server: Server, client: Socket, createPvpDto: CreatePvpDto) {
    const c = this.clients.shift();
    if (c) {
      const room = 'room' + c.id;
      client.join(room);
      c.join(room);
      //server.to(c.id).emit('joined', c.id, c.id);
      client.emit('joined', room, 0);
      c.emit('joined', room, 1);
    } else {
      this.clients.push(client);
    }
  }

  findAll() {
    return `This action returns all pvp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pvp`;
  }

  update(id: number, updatePvpDto: UpdatePvpDto) {
    return `This action updates a #${id} pvp`;
  }

  remove(id: number) {
    return `This action removes a #${id} pvp`;
  }
}
