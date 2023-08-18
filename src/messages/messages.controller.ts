import { Controller, Get } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Chat Messages')
@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  // CRUD

  @Get()
  getAllMessages() {
    return this.messagesService.getAllMessages();
  }
}
