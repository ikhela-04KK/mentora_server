import {
  Body,
  Controller,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Delete, Put } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsDto } from 'src/dto/chats/dto/chats.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateChatsDto } from 'src/dto/chats/dto/create-chats.dto';

@Controller('chats')
export class chatsController {
  constructor(private chatsService: ChatsService) {}

  @Get(':id')
  async getChats(@Param('id') id: number) {
    const chat = await this.chatsService.getChats(id);
    return chat;
  }

  @Get('user/:userid')
  async getChatsByUserId(@Param('id') id: number) {
    const chats = await this.chatsService.getChatsByUser(id);
    return chats;
  }

  @UseGuards(JwtGuard)
  @Post('')
  async createChat(@Body() body: CreateChatsDto) {
    const result = await this.chatsService.createChat(body);
    return result;
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  async updateChat(@Param(':id') id: string, @Body() body) {
    const result = await this.chatsService.updateChat(); //{id, chat:body}
    return result;
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteChat(@Param(':id') id: string) {
    const result = await this.chatsService.deleteChat(id);
    return result;
  }
}
