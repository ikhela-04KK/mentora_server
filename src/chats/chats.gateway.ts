import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
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
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection {
  private readonly logger = new Logger(ChatsGateway.name);
  connectedUsers: object[] = [];
  constructor(private readonly chatsService: ChatsService) {}

  @WebSocketServer() io: Namespace;
  server: Server;

  afterInit(): void {
    this.logger.log(' WebSocket Gateway initialize for the  first time');
  }

  // implement gateway connection
  async handleConnection(client: Socket) {
    this.logger.log(' Succefully handle connection');
    if (client.id) {
      // console.log('non autorisé');
      const user = await this.chatsService.getUserFromSocket(client);

      // * todo: comment mapper sur les directements

      this.connectedUsers = [
        ...this.connectedUsers,
        {
          id: client.id,
          email: String(user.email),
        },
      ];
    } else {
      console.log('Not Authorized');
    }

    const sockets = this.io.sockets;
    this.logger.debug(`Number of connected: ${sockets.size}`);
    this.logger.log(`WS Client with id: ${client.id} connected`);
    this.logger.log(`there are ${this.connectedUsers}`);
    this.io.emit('users', this.connectedUsers);

    // //Subscribe the users to their private chat room ( creer un room pour un utilisateur spécifique)
    //// client.join(user.email);
  }
  // const sockets = await io.of("/admin")

  // test for sending message i n...
  @SubscribeMessage('send_message')
  async handleEvent(
    @MessageBody() data: { to: string; content: string },
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    const user = await this.chatsService.getUserFromSocket(client);
    const userId = client.id;
    const userEmail = user.email;
    this.logger.log(`${user.id} : ${userEmail}`);
    // this.logger.log(`Author: ${user.email}, Data: ${data.content}`);

    const content = data.content;
    const receiver = data.to;
    // const sender = user.email;
    this.io
      .to(receiver)
      .emit('private_message', { from: { userId, userEmail }, content }); // chaque utilisateur est par défaut dans le room portant son propre identifiant
    return data;
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
