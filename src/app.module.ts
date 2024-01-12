import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { ChatsModule } from './chats/chats.module';
import { MessageModule } from './messages/messages.module';
// import * as redisStore from 'cache-manager-redis-store';
// import type { RedisClientOptions  } from 'redis';
import { CacheModule } from '@nestjs/cache-manager';


@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register(),
    UserModule,
    AuthModule,
    MulterModule.register({
      dest: './files',
      storage: 'diskStorage',
    }),
   
    ChatsModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {
  static port: any;
}
