import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsGateway } from './chats.gateway';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { chatsController } from './chats.controller';
import { MessagesService } from 'src/messages/messages.service';

@Module({
  // imports: [MessagesService],
  controllers: [chatsController],
  exports: [ChatsService],
  providers: [
    ChatsGateway,
    ChatsService,
    AuthService,
    UserService,
    PrismaService,
    JwtService,
    MessagesService,
  ],
})
export class ChatsModule {}
