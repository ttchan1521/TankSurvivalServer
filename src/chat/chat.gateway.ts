import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { ListChatDto } from './dto/list-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket, ...args: any[]) {
    this.server.emit('handleConnection', client.id);
  }

  handleDisconnect(client: Socket) {
    this.server.emit('handleDisconnect', client.id);
  }

  @SubscribeMessage('createChat')
  async create(
    @ConnectedSocket() client: Socket,
    @MessageBody() createChatDto: CreateChatDto,
  ) {
    const newChat = await this.chatService.create(createChatDto);
    client.broadcast.emit('newChat', newChat);
    return newChat;
  }

  @SubscribeMessage('findAllChat')
  async findAll(@MessageBody() listChatDto: ListChatDto) {
    return await this.chatService.findAll(listChatDto);
  }

  @SubscribeMessage('findOneChat')
  findOne(@MessageBody() id: number) {
    return this.chatService.findOne(id);
  }

  @SubscribeMessage('updateChat')
  update(@MessageBody() updateChatDto: UpdateChatDto) {
    return this.chatService.update(updateChatDto.id, updateChatDto);
  }

  @SubscribeMessage('removeChat')
  remove(@MessageBody() id: number) {
    return this.chatService.remove(id);
  }
}
