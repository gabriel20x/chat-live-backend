import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import MessageEntity from './messages.entity';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private messagesRepository: Repository<MessageEntity>,
  ) {}

  async getAllMessages() {
    const messages = await this.messagesRepository.find();
    if (messages) {
      return messages;
    }
    throw new HttpException(
      'There is not users in the database yet',
      HttpStatus.NOT_FOUND,
    );
  }

  async createMessage(messageData: MessageDto) {
    const newMessage = this.messagesRepository.create(messageData);
    await this.messagesRepository.save(newMessage);
    return newMessage;
  }
}
