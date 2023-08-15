import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import MessageDto from './dto/chat.dto';
import { MessagesService } from '../messages/messages.service';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private messagesService: MessagesService) {}

  @WebSocketServer() server: Server;

  afterInit() {
    console.log('------- Web socket iniciado -----');
  }

  handleConnection(socket: Socket) {
    this.server.emit('connection', socket.id);
    // console.log('Se ha conectado un usuario, su id:', socket.id);
  }

  handleDisconnect(socket: Socket) {
    this.server.emit('desconnection', socket.id);
    // console.log('Se ha desconectado un usuario, su id:', socket.id);
  }

  @SubscribeMessage('event_message')
  async handleIncommingMessage(client: Socket, payload: MessageDto) {
    const newMessage = await this.messagesService.createMessage(payload);
    this.server.emit('new_message', newMessage);
  }
}
