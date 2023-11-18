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
        destination: './files',
        filename: editFilname,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @Post('register')
  async registerUser(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
    dto: CreateUserDto,
  ) {
    console.log(body);
    console.log(file.originalname);
    console.log(file.filename);
    const selectedRole = body.role;
    console.log(selectedRole);
    return await this.userService.create(dto);
  }

  // @UseGuard(AuthGuard)
  @Post('login')
  async login(@Body() dto: loginDto) {
    return await this.authService.login(dto);
  }

  @UseGuards(refreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return await this.authService.refreshToken(req.user);
  }
}
