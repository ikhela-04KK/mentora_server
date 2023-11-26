import {
  WebSocketGateway,
  // SubscribeMessage,
  // MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  // ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatsService } from './chats.service';
import { Namespace, Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  namespace: 'chats',
  cors: {
    origin: ['*'],
  },
})
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection {
  private readonly logger = new Logger(ChatsGateway.name);
  constructor(private readonly chatsService: ChatsService) {}

  @WebSocketServer() io: Namespace;
  server: Server;

  afterInit(): void {
    this.logger.log(' WebSocket Gateway initialized for the first time');
  }

  // implement gateway connection
  handleConnection(client: Socket) {
    this.logger.log(' Succefully handle connection ');
    this.chatsService.getUserFromSocket(client);
    const sockets = this.io.sockets;
    this.logger.debug(`Number of connected: ${sockets.size}`);
    this.logger.log(`WS Client with id: ${client.id} connected`);
    client.emit('receive_message', 'Bonjour');
    this.io.emit('hello', 'marc');
  }

  // test for sending message in...
  // @SubscribeMessage('send_message')
  // listenForMessages(
  //   @MessageBody() data: string,
  //   @ConnectedSocket() socket: Socket,
  // ) {
  //   const author = this.chatsService.getUserFromSocket(socket);
  //   this.logger.log(`Author: ${author}, Data: ${data}`);
  //   this.server.sockets.emit('receive_message', { author, data });
  //   return data;
  // }

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
