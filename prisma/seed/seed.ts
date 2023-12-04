/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';
// import { fakeChatsComplete,  fakeMessages } from 'c:/Users/Administrateur/Documents/mentorat/mentora_server/prisma/fake-data';
const prisma = new PrismaClient();
//Create user and message
async function main() {
    const chat = await prisma.chats.findMany({
        include:{users:true, Messages:true}, 
        where: {
            id:3
        }
    })
    console.log(JSON.stringify(chat))
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
// si je fais create je dois inclus toutes les informations concernant la creation d'un utilisateur
// async function createChatBetweenUsers(userid1:number, userId2:number): Promise<number>{
    // const chat = await prisma.chats.create({
    //     data: { 
    //         ...fakeChatsComplete(),
    //         users: {
    //             connect: [{id:userid1},{id:userId2}],
    //         },
    //     },
    // }
    // )
    // return chat.id;
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

// const userId1 =3; 
// const userId2 = 5; 

// const chatId = await createChatBetweenUsers(userId1, userId2); 
// await saveMessage(userId1, chatId, fakeMessages().content); 
// await saveMessage(userId2, chatId,fakeMessages().content)
}

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
  