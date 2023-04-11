import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CollectibleService } from './collectible.service';
import { CreateCollectibleDto } from './dto/create-collectible.dto';
import { UpdateCollectibleDto } from './dto/update-collectible.dto';
import { CollectibleData } from './dto/collectible.dto';

@WebSocketGateway()
export class CollectibleGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly collectibleService: CollectibleService) {}

  @SubscribeMessage('createCollectible')
  create(@MessageBody() createCollectibleDto: CreateCollectibleDto) {
    return this.collectibleService.create(createCollectibleDto);
  }

  @SubscribeMessage('spawnCollectible')
  clear(
    @ConnectedSocket() client: Socket,
    @MessageBody() unitData: CollectibleData,
  ) {
    const room = unitData.roomId;
    console.log(JSON.stringify(unitData));
    client.broadcast.to(room).emit('OnSpawnCollectible', unitData);
  }

  @SubscribeMessage('findAllCollectible')
  findAll() {
    return this.collectibleService.findAll();
  }

  @SubscribeMessage('findOneCollectible')
  findOne(@MessageBody() id: number) {
    return this.collectibleService.findOne(id);
  }

  @SubscribeMessage('updateCollectible')
  update(@MessageBody() updateCollectibleDto: UpdateCollectibleDto) {
    return this.collectibleService.update(
      updateCollectibleDto.id,
      updateCollectibleDto,
    );
  }

  @SubscribeMessage('removeCollectible')
  remove(@MessageBody() id: number) {
    return this.collectibleService.remove(id);
  }
}
