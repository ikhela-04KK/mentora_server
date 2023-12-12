/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';
// // import { fakeChatsComplete, fakeMessages } from 'prisma/fake-data';
// // import { fakeChatsComplete, fakeMessages } from 'prisma/fake-data';
// import {
//   fakeChatsComplete,
//   fakeMessages,
// } from 'c:/Users/Administrateur/Documents/mentorat/mentora_server/prisma/fake-data';
const prisma = new PrismaClient();
// //Create user and message
async function main() {
  //  await prisma.user.create({
  //     include: { statuses: true },
  //     data: {
  //       ...fakeUserComplete(),
  //       statuses: {
  //         create: {
  //           ...fakeStatus(),
  //         },
  //       },
  //     },
  //   });
  // async function createChatBetweenUsers( userId2:number): Promise<number>{
  //     const chat = await prisma.chats.create({
  //         data: {
  //             ...fakeChatsComplete(),
  //             users: {
  //                 connect: [{id:userId2}],
  //             },
  //         },
  //     }
  //     )
  //     return chat.id;
  // }
  // async function saveMessage(userId:number, chatId:number,content:string): Promise<void>{
  //     await prisma.messages.create({
  //         include:{
  //             user:true,
  //             chat:true
  //         },
  //         data:{
  //             content: content,
  //             ...fakeMessages,
  //             user:{connect:{id:userId}},
  //             chat:{connect:{id:chatId}},
  //         }
  //     })
  // }
  // async function getAllMessage(id: number) {
  //   await prisma.user.findMany({:
  //     orderBy: {
  //       name: 'desc',
  //     },
  //     select: {
  //       id: true,
  //       name: true,
  //       avatar: true,
  //     },
  //     where:{
  //       id:{
  //         not: id,
  //       }
  //     }
  //   });
  // }
  // async function getAll() {
    // const azerty = await prisma.messages.findMany({
    //   include:{
    //     user:true,
    //     chat:true, 
    //   },
    //   where: {
    //     user: {
    //       id: 9,
    //     },
    //   },
    // });
    // const azerty = await prisma.user.findMany({
    //   include:{
    //     chats:{
    //       include:{
    //         users:true
    //       }
    //     }
    //   },
    //   where:{
    //     id:9
    //   }
    // })
    // const azerty = await prisma.chats.findMany({
    //   include:{
    //     users:true
    //   },
    //   where: {
    //     users: {
    //       some: {
    //         id: 9,
    //       },
    //     },
    //   },
    // });
    //   console.log(JSON.stringify(azerty))

    const geneba = await prisma.messages.findMany({
      where:{
        chat_id:9
      }
    })
    console.log(JSON.stringify(geneba))



  }

  // verfication de l'utilisateur a qui on envoie un message s'il son id est dans l'un des chats que je possède si oui ajouter le message de l'emetteur dans la liste de caht existant 
  //  si ce n'est le cas crée chat 

  // des que je clique sur un contact me conduit directement dans son chat dans le chatBox avec un focus sur ça conversation qu'il soitdans mes contacts 
  //  ou non  

  // getAll();

  // Au clique sur un chat marquer le comme lu
  // si je suis dans un chat qu'un utilsateur envoie un message marquer le directement comme lu
  // si il contient seenAt n'est pas alors retirez le boutton violet et le background
  // todo: à cause du setUserInfo , je dois const                                                                                                         ament
  // donc retirer setUserInfo
  // dans l'autre le chat box ilfaut faire un getAll sur toutes les conversations
  // implementez la liste des utilisateurs connectés
  // Au clique sur utilisateur et après l'envoi du message faire un post pour creer un chat entre les deux parties
  // et l'afficher directement dans liste des personnes connectés
  // après ça creer toutes les routes par rapport au caht et aux messages
  //  après ça maintenant il faut implementez le socket
  // const userId1 = 10;
  // const userId2 = 8;
  // // const chatId = await createChatBetweenUsers(userId1, userId2);
  // const chatId = 9;
  // await saveMessage(userId1, chatId,"ma grand-mère à 11 banane ");
  // await saveMessage(userId2, chatId,"oui, je suis à 9 ")
  // const chat = await prisma.chats.findMany({
  //   include:{users:true, Messages:true},
  //   where: {
  //       id:5
  //   }
  // })
  // const messages = await prisma.messages.findMany({
  //   include:{user:true, chat:true,},
  //   where:{
  //     id:2
  //   }
  // })
  // const users = await prisma.user.findMany({
  //   include:{ chats:{
  //     include:{users:true, Messages:true}
  //   }},
  //   where:{
  //     id:3
  //   }
  // })
  // console.log(JSON.stringify(users))
  // }

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

//   @Injectable()
//   export class seedService {
//       constructor(private prisma: PrismaService) { }

//       async createUserAndViewStatus() {
//           return await this.prisma.user.create({
//               include: { statuses: true },
//               data: {
//                   ...fakeUserComplete(),
//                   password: await hash(fakeUserComplete().password, 10),
//                   statuses: {
//                       create: {
//                           ...fakeStatus(),
//                       },
//                   },
//               },
//           });
//       }
//   }

//   const user01 = new seedService(new PrismaService())
//   user01.createUserAndViewStatus()
//   console.log(user01);

/**
 * La parti contact va retourner tout les contacts qui sont connectés aux sockets
 *
 *
 *
 */
