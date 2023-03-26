import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChatDto } from './dto/create-chat.dto';
import { ListChatDto } from './dto/list-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat, ChatDocument } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private readonly chatModel: Model<ChatDocument>,
  ) {}
  async create(createChatDto: CreateChatDto) {
    const newChat = new this.chatModel(createChatDto);
    return await newChat.save();
  }

  async findAll(listChatDto: ListChatDto) {
    const pagination = listChatDto.pagination;

    if (pagination) {
      return await this.chatModel.find();
    }

    const page = listChatDto.page || 1;
    const perPage = listChatDto.perPage || 10;
    const skip = (page - 1) * perPage;

    return await this.chatModel.find().skip(skip).limit(perPage);
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
