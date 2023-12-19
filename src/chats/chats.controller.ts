/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
// import { Delete, Put } from '@nestjs/common';
import { ChatsService } from './chats.service';
// import { JwtGuard } from 'src/auth/guards/jwt.guard';
// import { CreateChatsWithMessagDto } from 'src/dto/chats/dto/create-chats.dto';
// import { MessagesService } from 'src/dto/messages/messages.service';
import { UserService } from 'src/user/user.service';
import { MessagesService } from 'src/messages/messages.service';
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

  // @UseGuards(JwtGuard)
  @Post('user/:id')
  async createChat(@Param('id') id:number, @Body() body ) {
    
    // juste en faisant un connecte or Create je epux resoudre le problème de duplciationd e messag 
    const chat = await this.chatsService.createChat(body,id, body.to);
    const dto = {
    chat_id:chat.chat_id,
    user_id: id, 
    content: body.content, 
    }

    // cette ligne ne doit pas être là  parcr qu'elle crée un nouveau caht à chaque fois
    //  au clique une verification rapide de s'il y' aun conversation entre les deux si oui on fera un addMessage avec l'id de du chat sinon on creer un nouveau chat 
  const message = await this.messagesService.addMessage(dto)
    return{
      message
    }
  }
  }

