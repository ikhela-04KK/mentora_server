import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// pipe de validation intégré à nest js qui fonctionne avec class-validator et class-transformer

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // using of globalPipe to trnsoform data retrieving on prisma database

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(8000);
}
bootstrap();
