import {
  WebSocketGateway,
  OnGatewayInit,
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

@WebSocketGateway({
  namespace: 'chats',
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(ChatsGateway.name);
  constructor(private readonly chatsService: ChatsService) {}

  @WebSocketServer() io: Namespace;
  server: Server;
  connectedUsers: string[] = [];

  afterInit(): void {
    this.logger.log(' WebSocket Gateway initialize for the  first time');
  }

  // implement gateway connection
  async handleConnection(client: Socket) {
    this.logger.log(' Succefully handle connection');

    try {
      // console.log('non autorisé');
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
      // Send list of connected users
      this.server.emit('users', this.connectedUsers);
    } catch (error) {
      this.logger.warn(`Error getting user from socket: ${error.message}`);
      client.disconnect(true);
    }

    const sockets = this.io.sockets;
    this.logger.debug(`Number of connected: ${sockets.size}`);
    this.logger.log(`WS Client with id: ${client.id} connected`);
    this.logger.log(`there are ${this.connectedUsers}`);
    this.io.emit('users', this.connectedUsers);

    client.join(client.id);
  }

  async handleDisconnect(client: Socket) {
    try {
      const user = await this.chatsService.getUserFromSocket(client);
      const userPos = this.connectedUsers.indexOf(String(user.id));
      this.connectedUsers = this.connectedUsers.slice(0, userPos);

      //recupérer les ids après les ids de l'utilisateur si l'utilsateur se trouve entre par exemple {  1, 2,3}
      this.connectedUsers = this.connectedUsers.slice(userPos + 1);

      // Sends the new list of connected users
      this.server.emit('users', this.connectedUsers);
    } catch (error) {
      this.logger.warn(`Error getting user from socket: ${error.message}`);
      client.disconnect(true);
    }
  }

  @SubscribeMessage('send_message')
  async handleEvent(
    @MessageBody()
    data: {
      id: string;
      username: string;
      to: string;
      message: string;
      certified: boolean;
      location: string;
      online: boolean;
      source: string;
    },
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    const user = await this.chatsService.getUserFromSocket(client);
    const id = client.id;
    const username = user.email;

    this.logger.log(`${id} : ${username}`);
    const message = data.message;
    const receiver = data.to;
    const certified = data.certified;
    const location = data.location;
    const online = data.online;
    const source = data.source;
    this.io.to(receiver).emit('private_message', {
      id,
      username,
      certified,
      location,
      online,
      source,
      message,
      receiver,
    }); // chaque utilisateur est par défaut dans le room portant son propre identifiant
    return data;
  }
  @SubscribeMessage('typing')
  handleTyping(client: Socket) {
    client.emit('typing', client.handshake.headers.name);
  }
}

  // @SubscribeMessage('createChat')
  // create(@MessageBody() createChatDto: CreateChatDto) {
  //   return this.chatsService.create(createChatDto);
  // }

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
}
