import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/dto/dto.user';
import { UserService } from 'src/user/user.service';
import { loginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { refreshJwtGuard } from './guards/refresh.guards';
// import { AuthGuard} from './auth.service';



@Controller('auth')
export class AuthController {
    constructor(
        private userService:UserService,
        private authService:AuthService
    ){}

    @Post('register')
    async registerUser(@Body() dto:CreateUserDto){
        return await this.userService.create(dto)
    }

    // @UseGuard(AuthGuard)
    @Post('login')
    async login(@Body() dto:loginDto){
        return await this.authService.login(dto)
        
    }

    @UseGuards(refreshJwtGuard)
    @Post('refresh')
    async refreshToken(@Request() req){
        return await this.authService.refreshToken(req.user)
    }
  
}


