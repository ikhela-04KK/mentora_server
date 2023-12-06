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
import { CreateChatsDto } from 'src/dto/chats/dto/create-chats.dto';

@WebSocketGateway({
  namespace: 'chats',
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(ChatsGateway.name);
  constructor(private readonly chatsService: ChatsService) {}

  @WebSocketServer() io: Namespace;
  server: Server;
  connectedUsers: string[] = [];

  // afterInit(): void {
  //   this.logger.log(' WebSocket Gateway initialize for the  first time');
  // }

  async handleConnection(client: Socket) {
    this.logger.log(' Succefully handle connection');

    try {
      const user = await this.chatsService.getUserFromSocket(client);

      // * todo: comment mapper sur les directements

      // this.connectedUsers = [
      //   ...this.connectedUsers,
      //   {
      //     id: client.id,
      //     email: String(user.email),
      //   },
      // ];
      this.connectedUsers = [...this.connectedUsers, String(user.id)];
      const sockets = this.io.sockets;
      this.logger.debug(`Number of connected: ${sockets.size}`);
      this.logger.log(`WS Client with id: ${client.id} connected`);
      this.logger.log(`there are ${this.connectedUsers}`);
      this.io.emit('users', this.connectedUsers);
    } catch (error) {
      this.logger.warn(`Error getting user from socket: ${error.message}`);
      client.disconnect(true);
    }
  }

  async handleDisconnect(client: Socket) {
    try {
      const user = await this.chatsService.getUserFromSocket(client);
      const userPos = this.connectedUsers.indexOf(String(user.id));
      this.connectedUsers = this.connectedUsers.slice(0, userPos);
      this.connectedUsers = this.connectedUsers.slice(userPos + 1);
      this.server.emit('users', this.connectedUsers);
    } catch (error) {
      this.logger.warn(`Error getting user from socket: ${error.message}`);
      client.disconnect(true);
    }
  }

  @SubscribeMessage('create_chat')
  async handleEvent(
    @MessageBody() dto: CreateChatsDto,
    @ConnectedSocket() client: Socket,
  ) {
    // Authenfication
    const user = await this.chatsService.getUserFromSocket(client);
    const id = client.id;
    const username = user.email;
    this.logger.log(`${id} : ${username}`);
    const newChat = await this.chatsService.createChat(dto);
    client.join(newChat.data.name);

    client.broadcast.to(newChat.data.name).emit('chat_created', {
      ...dto,
    });
  }

  // @SubscribeMessage('typing')
  // handleTyping(client: Socket) {
  //   client.emit('typing', client.handshake.headers.name);
  // }
}

// @SubscribeMessage('findAllChats')
// findAll() {
//   return this.chatsService.findAll();
// }

// @SubscribeMessage('findOneChat')
// findOne(@MessageBody() id: number) {
//   return this.chatsService.findOne(id);
// }

// @SubscribeMessage('updateChat')
// update(@MessageBody() updateChatDto: UpdateChatDto) {
//   return this.chatsService.update(updateChatDto.id, updateChatDto);
// }

// @SubscribeMessage('removeChat')
// remove(@MessageBody() id: number) {
//   return this.chatsService.remove(id);
// }
