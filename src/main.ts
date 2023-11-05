import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    transform:true
  }));

   //intégrer un pipeline pour avoir les types correctes lorsqu'ils sont envoyés de prisma 
  await app.listen(8000);
  
  
}
bootstrap();
