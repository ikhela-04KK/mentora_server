/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
// import { Delete, Put } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateChatsDto } from 'src/dto/chats/dto/create-chats.dto';

@Controller('chats')
export class chatsController {
  constructor(private chatsService: ChatsService) {}

  @Get('user/:id')
  async getChatsByUserId(@Param('id') id: number) {
    const chats = await this.chatsService.getChatsByUserId(id);
    return chats;
  }

  @UseGuards(JwtGuard)
  @Post('')
  async createChat(@Body() body: CreateChatsDto) {
    const result = await this.chatsService.createChat(body);
    return result;
  }
}
