import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFilname, imageFileFilter } from './utils/fuu';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('selection-role')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFilname,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async handleRoleSelection(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    console.log(body);
    console.log(file.originalname);
    console.log(file.filename);
    const selectedRole = body.role;
    console.log(selectedRole);
    // Effectuez ici la validation et le traitement des données selon vos besoins
    // Enregistrez l'image, vérifiez le rôle, etc.
    return { message: 'Data received and processed successfully' };
  }
}
