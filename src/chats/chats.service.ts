import { Injectable, Logger } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
// import { CreateChatDto } from './dto/create-chat.dto';
// import { UpdateChatDto } from './dto/update-chat.dto';

@Injectable()
export class ChatsService {
  private readonly logger = new Logger(ChatsService.name);
  constructor(private authService: AuthService) {}

  async getUserFromSocket(client: Socket) {
    this.logger.log('Begininng authentification');
    let auth_token = client.handshake.headers.authorization;
    //get the token itself without bearer
    auth_token = auth_token.split(' ')[1];
    const user = this.authService.getUserFromAuthenticationToken(auth_token);
    if (!user) {
      throw new WsException('Invalid credentials');
    }
  }

  // create(createChatDto: CreateChatDto) {
  //   return 'This action adds a new chat';
  // }

  // findAll() {
  //   return `This action returns all chats`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} chat`;
  // }

  // update(id: number, updateChatDto: UpdateChatDto) {
  //   return `This action updates a #${id} chat`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} chat`;
  // }
}
