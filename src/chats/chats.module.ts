import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsGateway } from './chats.gateway';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    ChatsGateway,
    ChatsService,
    AuthService,
    UserService,
    PrismaService,
    JwtService,
  ],
})
export class ChatsModule {}
