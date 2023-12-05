import { Body, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messageService.getMessage({ id });
    return message;
  }

  @Get('chat/:id')
  async getMessageByChat(@Param('id') id: number) {
    const message = await this.messageService.getMessagesByChat({ id });
    return message;
  }

  @Post('')
  async createMessage(@Body() body) {
    const result = await this.messageService.addMessage(body);
    return result;
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  async updateMessage(@Param('id') id: number, @Body() body) {
    const result = await this.messageService.updateMessage({
      id,
      message: body,
    });
    return result;
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteMessage(@Param('id') id: number) {
    const result = await this.messageService.deleteMessage({ id });
    return result;
  }
}