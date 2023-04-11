import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { UnitData } from './dto/unit.dto';

@WebSocketGateway()
export class UnitGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly unitService: UnitService) {}

  @SubscribeMessage('createUnit')
  create(@MessageBody() createUnitDto: CreateUnitDto) {
    return this.unitService.create(createUnitDto);
  }

  @SubscribeMessage('findAllUnit')
  findAll() {
    return this.unitService.findAll();
  }

  @SubscribeMessage('spawnUnit')
  spawn(@ConnectedSocket() client: Socket, @MessageBody() unitData: UnitData) {
    const room = unitData.roomId;
    client.broadcast.to(room).emit('OnSpawnUnit', unitData);
  }

  @SubscribeMessage('enemyMove')
  move(@ConnectedSocket() client: Socket, @MessageBody() unitData: UnitData) {
    const room = unitData.roomId;
    client.broadcast.to(room).emit('OnEnemyMove', unitData);
  }

  @SubscribeMessage('unitHealthChange')
  health(@ConnectedSocket() client: Socket, @MessageBody() unitData: UnitData) {
    const room = unitData.roomId;
    client.broadcast.to(room).emit('OnUnitHealthChange', unitData);
  }

  @SubscribeMessage('unitClear')
  clear(@ConnectedSocket() client: Socket, @MessageBody() unitData: UnitData) {
    const room = unitData.roomId;
    client.broadcast.to(room).emit('OnUnitClear', unitData);
  }

  @SubscribeMessage('findOneUnit')
  findOne(@MessageBody() id: number) {
    return this.unitService.findOne(id);
  }

  @SubscribeMessage('updateUnit')
  update(@MessageBody() updateUnitDto: UpdateUnitDto) {
    return this.unitService.update(updateUnitDto.id, updateUnitDto);
  }

  @SubscribeMessage('removeUnit')
  remove(@MessageBody() id: number) {
    return this.unitService.remove(id);
  }
}
