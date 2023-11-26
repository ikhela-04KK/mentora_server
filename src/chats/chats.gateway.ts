import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  // ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { ChatsService } from './chats.service';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  namespace: 'chatsGateway',
  cors: {
    origin: [],
  },
})
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection {
  server: Server;
  private readonly logger = new Logger(ChatsGateway.name);
  constructor(private readonly chatsService: ChatsService) {}

  afterInit(): void {
    this.logger.log(' WebSocket Gateway initialized for the first time');
  }

  // implement gateway connection
  async handleConnection(socket: Socket) {
    await this.chatsService.getUserFromSocket(socket);
  }

  // test for sending message in...
  @SubscribeMessage('send-message')
  handleEvent(@MessageBody() message: string) {
    // const user = this.chatsService.getUserFromSocket(socket);
    // this.server.sockets.emit('receive_message', {
    //   message,
    //   user,
    // });
    this.logger.log(message);
    // return message;
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
