import {
  ConnectedSocket,
  MessageBody,
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
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import * as _ from 'lodash';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private messagesService: MessagesService,
    private authService: AuthService,
  ) {}

  users = {};

  @WebSocketServer() server: Server;

  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }

  afterInit() {
    console.log('------- Web socket iniciado -----');
  }

  async handleConnection(socket: Socket) {
    try {
      // Extraemos del socket del cliente el JWT y lo desencriptamos.
      const authHeader = socket.handshake.headers.authorization;
      const [, token] = authHeader ? authHeader.split(' ') : [null, ''];
      const { id: userId } = await this.authService.verifyJwt(
        socket.handshake.auth.Authorization || token,
      );
      // Si no existe el id desconectamos el cliente del servidor.
      if (!userId) return this.disconnect(socket);

      // Si el usuario no esta en memoria, creamos una key con el id del usuario y asignamos un array vacio.
      if (!this.users[userId]) {
        this.users[userId] = [];
        // Para los demas clientes emitira que un usuario nuevo se ha conectado
        socket.broadcast.emit('connection', userId);
      }
      // Se agregara al array del usuario el id del cliente con el cual se esta conectando.
      this.users[userId].push(socket.id);
      // Para el cliente que se conecto se emitira a el mismo siempre la lista completa de los usuarios
      socket.emit('users_in_line', Object.keys(this.users));
    } catch (error) {
      // Si ocurre un error desconectamos el cliente del servidor.
      console.error(error);
      return this.disconnect(socket);
    }
  }

  handleDisconnect(socket: Socket) {
    // Verificamos que el array de usuarios no este vacio.
    if (_.isEmpty(this.users)) return;
    // Obtenemos el id del usuario que se esta desconectado, y eliminamos de su array el socket que se esta desconectando.
    const userKey = _.findKey(this.users, (ids: [string]) =>
      _.some(ids, (id) => id === socket.id),
    );
    if (!userKey) return;
    _.remove(this.users[userKey], (id) => id === socket.id);
    // Si el usuario ha desconectado todos los sockets asignados a él, se elimina el id del usuario de la lista
    // y emitimos que el usuario se ha desconectado completamente.
    if (_.isEmpty(this.users[userKey])) {
      delete this.users[userKey];
      return this.server.emit('desconnection', userKey);
    }
    // Si el usuario aún tiene un socket asignado, no se notifica que se ha desconectado.
  }

  // @UseGuards(AuthGuard)
  @SubscribeMessage('event_message')
  async handleIncommingMessage(
    @MessageBody() message: MessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
    try {
      const authHeader = socket.handshake.headers.authorization;
      const [, token] = authHeader ? authHeader.split(' ') : [null, ''];
      const { id: userId } = await this.authService.verifyJwt(
        socket.handshake.auth.Authorization || token,
      );
      if (!userId) return;

      const newMessage = await this.messagesService.createMessage(
        message,
        userId,
      );
      this.server.emit('new_message', newMessage);
    } catch (error) {
      return console.error(error);
    }
  }
}
