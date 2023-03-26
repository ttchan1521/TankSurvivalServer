import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './entities/chat.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Chat.name,
        useFactory: () => {
          const schema = ChatSchema;
          return schema;
        },
      },
    ]),
  ],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
