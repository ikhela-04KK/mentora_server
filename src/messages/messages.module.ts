/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
// import { UserModule } from 'src/user/user.module';
import { MessagesService } from './messages.service';
import { PrismaService } from 'src/prisma.service';
import { MessageController } from './messages.controller';
@Module({
  //   imports: [UserModule],
  controllers: [MessageController],
  providers: [MessagesService, PrismaService],
  // exports: [MessagesService],
})
export class MessageModule {}
