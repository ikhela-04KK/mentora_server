import { ConflictException, Injectable } from '@nestjs/common';
import {PrismaService} from 'src/prisma.service';
import { CreateUserDto } from './dto/dto/dto.user';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    async create(dto:CreateUserDto){
        const user = await this.prisma.user.findUnique({
            where:{
                email:dto.email}
        })

        if (user) throw new ConflictException(`email duplicated in ${dto.email}`)

        const newUser = await this.prisma.user.create({ 
            data: {
                ...dto
            }
        })

    }

};