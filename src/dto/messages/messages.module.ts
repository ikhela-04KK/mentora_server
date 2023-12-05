import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { MessagesService } from './messages.service';
import { MessageController } from './messages.controller';


@Module({
  imports: [UserModule],
  controllers: [MessageController],
  providers: [MessagesService,],
  exports: [MessagesService]
})
export class MessageModule {}