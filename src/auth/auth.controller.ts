import {
  Body,
  Controller,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/dto/dto.user';
import { UserService } from 'src/user/user.service';
import { loginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { refreshJwtGuard } from './guards/refresh.guards';
import { diskStorage } from 'multer';
import { editFilname, imageFileFilter } from 'src/utils/fuu';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  // put the interceptors here
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination:
          'C:\\Users\\Administrateur\\Documents\\mentorat\\mentora-front\\mentorat_front\\public',
        filename: editFilname,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @Post('register')
  async registerUser(
    @UploadedFile()
    file: Express.Multer.File,
    @Body() body: CreateUserDto,
  ) {
    try {
      console.log(body.email);
      body['avatar'] = file.filename;

      console.log(file);
      console.log(file.filename);
      return await this.userService.create(body);
    } catch (error) {
      console.log(error);
    }
  }

  // @UseGuards(AuthGuard)
  @Post('login')
  async login(@Body() dto: loginDto) {
    return await this.authService.login(dto);
  }
  @UseGuards(refreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    console.log('refreshed');
    return await this.authService.refreshToken(req.user);
  }
}
