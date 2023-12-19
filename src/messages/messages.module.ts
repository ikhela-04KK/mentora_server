/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
// import { UserModule } from 'src/user/user.module';
import { MessagesService } from './messages.service';
import { PrismaService } from 'src/prisma.service';
import { MessageController } from './messages.controller';
@Module({
  //   imports: [UserModule],
  providers: [MessagesService, PrismaService],
  controllers: [MessageController],
  exports: [MessagesService],
})
export class MessageModule {}
