import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { loginDto } from './dto/auth.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService){}4

    async login(dto:loginDto) {
        const user = await this.validateUser(dto)
    }


    async validateUser(dto:loginDto){
        const user = await this.userService.findByEmail(dto.username);

        if (user && (await compare(dto.password, user.password))){
            const {password, ...result} = user; 
            return result;
        }
        throw new UnauthorizedException('Invalid password');
    }
}

