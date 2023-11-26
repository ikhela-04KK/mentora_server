import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { MessagesModule } from './messages/messages.module';
import { ChatsModule } from './chats/chats.module';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    MulterModule.register({
      dest: './files',
      storage: 'diskStorage',
    }),
    MessagesModule,
    ChatsModule,
    GroupsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
