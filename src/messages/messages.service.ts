import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import MessageEntity from './messages.entity';
import { MessageDto } from './dto/message.dto';
import { Repository } from 'typeorm';
import UserEntity from '../users/users.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private messagesRepository: Repository<MessageEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
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

  async getAllUserMessages(id: string) {
    const messages = await this.messagesRepository.find({
      relations: {
        sender: true,
      },
      where: {
        sender: { id },
      },
      select: { sender: { id: false, messages: false, username: false } },
    });
    if (messages) {
      return messages;
    }
    throw new HttpException(
      'There is not users in the database yet',
      HttpStatus.NOT_FOUND,
    );
  }

  async createMessage(messageData: MessageDto, userId: string) {
    const sender = await this.usersRepository.findOneBy({ id: userId });
    const newMessage = this.messagesRepository.create({
      ...messageData,
      sender,
    });
    await this.messagesRepository.save(newMessage);
    return newMessage;
  }
}
