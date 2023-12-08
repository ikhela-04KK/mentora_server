import { Injectable, Logger } from '@nestjs/common';
import { CreateMessagesDto } from './dto/create-messages.dto';
import { PrismaService } from 'src/prisma.service';

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
}
