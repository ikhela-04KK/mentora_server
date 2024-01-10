import { Injectable, Logger } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { CreateChatsDto } from 'src/dto/chats/dto/create-chats.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateChatResponse } from './dto/createChatResponse';

// catch (error) {
//   this.logger.error(error);
//   return {
//     statusCode: '400',
//     message: error,
//   };
// }
@Injectable()
export class ChatsService {
  private readonly logger = new Logger(ChatsService.name);
  constructor(
    private authService: AuthService,
    private prisma: PrismaService,
  ) {}

  // *
  // async getChats(id:number){
  //   try{
  //   }
  //   catch{
  //     return {
  //       statusCode:'404',   
  //       message: 'Chat n`existe pas.',
  //     }
  //   }
  // }

  // implementations du getBy.
  async getChatsByUserId(id: number) {
    try {
      const chats = await this.prisma.chats.findMany({
        where: {
          users: {
            some: {
              id: id,
            },
          },
        },
        orderBy: { created_at: 'desc' },
        select: {
          id: true,
          users: {
            select: {
              id: true,
              name: true,
              avatar: true,
              location: true,
              role: true,
            },
          },
        },
      });
      console.log(chats);

      const lastMessagePromise = chats.map(async (chat) => {
        return this.prisma.messages.findMany({
          where: {
            chat_id: chat.id,
            NOT: {
              user_id: id,
            },
          },
          orderBy: { created_at: 'desc' },
        });
      });

      const lastMessages = await Promise.all(lastMessagePromise);
      return {
        lastMessages,
        chats,
      };
    } catch (error) {
      return {
        statusCode: '404',
        message: 'Utilisateur ou chat introuvable.',
      };
    }
  }

  async createChat(
    dto: CreateChatsDto,
    user_id: number,
    to: number,
  ): Promise<CreateChatResponse> {
    this.logger.log('entrer here');
    const data = await this.prisma.chats.findFirst({
      where: {
        AND: [{ users: { some: { id: to } } }],
      },
    });
    if (data) {
      return {
        data: data,
        statusCode: '200',
        message: 'Chat existant trouvé',
        chat_id: data.id,
      };
    } else {
      const newChat = await this.prisma.chats.create({
        data: {
          name: dto.name,
          users: {
            connect: [{ id: user_id }, { id: to }],
          },
        },
      });
      const { id, name } = newChat;
      this.logger.log(`Chat avec ${id} et ${name} a été créé avec succès`);
      return {
        data: newChat,
        statusCode: '201',
        message: 'Chat crée avec succès.',
      };
    }
  }

  // async updateChat(){
  //   try {
  //     return {
  //       statusCode: '200',
  //       message: 'Chat updated successfully.'
  //     };

  //   } catch (error) {
  //     return {
  //       statusCode: '404',
  //       message: 'chat not found.'
  //     };
  //   }
  // }
  // async deleteChat(){
  //   try {
  //     return {
  //       statusCode: '200',
  //       message: 'Chat deleted successfully.'
  //     };

  //   } catch (error) {
  //     return {
  //       statusCode: '404',
  //       message: 'chat not found.'
  //     };

  //   }
  // }

  async getUserFromSocket(client: Socket) {
    this.logger.log('Begininng authentification');

    try {
      let auth_token = client.handshake.headers.authorization;
      //get the token itself without bearer

      if (!auth_token) {
        throw new WsException('Authorization token is missing');
      }

      // Get the token itself without beaer
      auth_token = auth_token.split(' ')[1];

      const user = this.authService.getUserFromAuthenticationToken(auth_token);
      if (!user) {
        client.disconnect(true);
        throw new WsException('Invalid credentials');
      }
      return user;
    } catch (error) {
      client.disconnect(true);
      this.logger.error(`Error during authentication: ${error.message}`);
      // throw new WsException('Authentication failed');
    }
  }

  // create(createChatDto: CreateChatDto) {
  //   return 'This action adds a new chat';
  // }

  // findAll() {
  //   return `This action returns all chats`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} chat`;
  // }

  // update(id: number, updateChatDto: UpdateChatDto) {
  //   return `This action updates a #${id} chat`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} chat`;
  // }
}

// creer un chat avec un utilsateur
// ensuite si un utilisateur se connecte via socket modifié le chat via socket
