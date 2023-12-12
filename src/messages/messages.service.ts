/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { CreateMessagesDto } from './dto/create-messages.dto';
import { PrismaService } from 'src/prisma.service';
import { ConnectMessagesDto } from './dto/connect-messages.dto';

@Injectable()
export class MessagesService {
  private readonly logger = new Logger(MessagesService.name);
  constructor(private prisma: PrismaService) {}
  async addMessage(dto: CreateMessagesDto) {
    try {
      this.logger.log('entrer here');
      const message = await this.prisma.messages.create({
        data: {
          content: dto.content,
          user: { connect: { id: dto.user_id } },
          chat: { connect: { id: dto.chat_id } },
        },
      });
      return {
        result: message,
        statusCode: '201',
        message: 'Message created successfully.',
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: error,
      };
    }
  }

  
   async getMessagesByChat(dto:ConnectMessagesDto){
     try{
      const message = await this.prisma.messages.findMany({
        where:{
          chat_id:dto.id
        }
      })
       return {
         result:message, 
         statusCode:'200', 
         message:"La récupération des messages a été effectué avec succès"
       }
     }
     catch(error){
       return {
         statusCode:400, 
         message:error,
        }
     }
   }
}
