import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { ChatsService } from './chats.service';
import { Namespace, Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ChatMessagerie, connectUsers } from 'src/common/types';
import { MessagesService } from 'src/messages/messages.service';

@WebSocketGateway({
  namespace: 'chats',
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(ChatsGateway.name);
  constructor(
    private readonly chatsService: ChatsService,
    private readonly messagesService: MessagesService,
  ) {}

  @WebSocketServer() io: Namespace;
  server: Server;
  connectedUsers: connectUsers[] = [];

  // afterInit(): void {
  //   this.logger.log(' WebSocket Gateway initialize for the  first time');
  // }

  async handleConnection(client: Socket) {
    this.logger.log(' Succefully handle connection');

    try {
      const user = await this.chatsService.getUserFromSocket(client);
      //verfication d'un utilisateur dupliquer
      if (
        !this.connectedUsers.some((userSocket) => userSocket.idUser === user.id)
      ) {
        this.connectedUsers = [
          ...this.connectedUsers,
          {
            idSocket: client.id,
            idUser: user.id,
            name: user.name,
          },
        ];
      }
      const sockets = this.io.sockets;
      this.logger.debug(`Number of connected: ${sockets.size}`);
      this.logger.log(`WS Client with id: ${client.id} connected`);
      this.logger.log(this.connectedUsers);
      this.io.emit('users', this.connectedUsers);
    } catch (error) {
      this.logger.warn(`Error getting user from socket: ${error.message}`);
      client.disconnect(true);
    }
  }

  async handleDisconnect(client: Socket) {
    try {
      const user = await this.chatsService.getUserFromSocket(client);
      const user_id = user.id;
      this.logger.log(user.id);
      const userPos = this.connectedUsers.findIndex(
        (user) => user.idUser === user_id,
      );
      if (userPos !== -1) {
        this.connectedUsers = [
          ...this.connectedUsers.slice(0, userPos),
          ...(this.connectedUsers = this.connectedUsers.slice(userPos + 1)),
        ];
      }
      this.server.emit('users', this.connectedUsers);
    } catch (error) {
      this.logger.warn(`Error getting user from socket: ${error.message}`);
      client.disconnect(true);
    }
  }

  @SubscribeMessage('send-message')
  async handleEvent(
    @MessageBody() data: ChatMessagerie,
    @ConnectedSocket() client: Socket,
  ) {
    const user = await this.chatsService.getUserFromSocket(client);

    const id = client.id;
    const username = user.email;
    this.logger.log(`${id} : ${username}`);
    const newChat = await this.messagesService.addMessage(data);
    client.join(String(newChat.result.chat_id));
    client.broadcast
      .to(String(newChat.result.chat_id))
      .emit('receive-message', {
        ...data,
      });
  }

  //
  @SubscribeMessage('typing')
  async typing(
    @MessageBody() data: ChatMessagerie,
    @ConnectedSocket() client: Socket,
  ) {
    this.logger.debug(
      `username ${data.user_id} in ${data.chat_id} typing.....`,
    );
    // client.join(String(data.chat_id));
    client.broadcast.emit('typing', data);
  }
}
