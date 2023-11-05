import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [AuthService,UserService,PrismaService],
  controllers: [AuthController]
})
export class AuthModule {}
