/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
// import { Delete, Put } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateChatsWithMessagDto } from 'src/dto/chats/dto/create-chats.dto';
import { MessagesService } from 'src/dto/messages/messages.service';
import { UserService } from 'src/user/user.service';
// import { CreateMessagesDto } from 'src/dto/messages/dto/create-messages.dto';

@Controller('chats')
export class chatsController {
  constructor(
    private chatsService: ChatsService,
    private messagesService: MessagesService,
    private userService: UserService) 
  {}

      
  @Get("contacts/:id")
  async getContact(@Param('id') id:number){
    const contacts  = await this.userService.findMany(id)
    return contacts
  }

  @Get('user/:id')
  async getChatsByUserId(@Param('id') id: number) {
    const chats = await this.chatsService.getChatsByUserId(id);
    return chats;      
  }      

  @UseGuards(JwtGuard)
  @Post('user/:id')
  async createChat(@Param('id') id:number, @Body() body: CreateChatsWithMessagDto ) {
    
    const chat = await this.chatsService.createChat(body,id, body.to);
    const dto = {
    chat_id:chat.data.id,
    user_id: id, 
    content: body.content, 
    // to :body.idu,
    }
  const message = await this.messagesService.addMessage(dto)
    return{
      message
    }
  }
  }

