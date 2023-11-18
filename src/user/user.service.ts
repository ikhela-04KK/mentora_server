import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/dto/dto.user';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user) throw new ConflictException(`email duplicated in ${dto.email}`);

    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        password: await hash(dto.password, 10),
      },
    });
    // console.log(body);
    // console.log(file.originalname);
    // console.log(file.filename);
    // const selectedRole = body.role;
    // console.log(selectedRole);

    const { password, ...result } = newUser; // extraire le password et retourne uniqumenet result.
    console.log(`${password} succefully created`);
    return { result, message: 'Data received and processed successfully' };
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async findById(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }
}

// lors du process il garde les 1er dans le state puis passe à l'autre route qui selection-role puis ajouter les informations du nouveaux form contenant le role et l'image dans le form generere 1erment par la route register ensuite il si tout ces biens passés il envoie ces informations à la base de donnée
