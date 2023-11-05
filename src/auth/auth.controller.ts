import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/dto/dto.user';
import { UserService } from 'src/user/user.service';
import { loginDto } from './dto/auth.dto';


@Controller('auth')
export class AuthController {
    constructor(private userService:UserService){}

    @Post('register')
    async registerUser(@Body() dto:CreateUserDto){
        return await this.userService.create(dto)
    }

    @Post('login')
    async login(@Body() dto:loginDto){
        
    }
}


