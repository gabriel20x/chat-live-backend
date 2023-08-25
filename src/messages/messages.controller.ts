import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Chat Messages')
@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  // CRUD
  @UseGuards(AuthGuard)
  @Get()
  getAllMessages() {
    return this.messagesService.getAllMessages();
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'identificador del usuario que se quieren los mensajes',
    type: 'string',
  })
  @UseGuards(AuthGuard)
  @Get('user/:id')
  getAllUserMessages(@Param('id') id: string) {
    return this.messagesService.getAllUserMessages(id);
  }
}
