import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';
// pipe de validation intégré à nest js qui fonctionne avec class-validator et class-transformer

// pour suivre les exeption
// import { HttpExeceptionFilter } from './filters/http-exception.filter';

// importer les cookie
// *TODO: voir comment les cookies fonctionne et comment les intégrés au mieux dans une application de messagerie
// import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(
    cors({
      origin: 'http://localhost:3000', // Remplacez ceci par l'URL de votre frontend
    }),
  );
  // swagger setup
  const config = new DocumentBuilder()
    .setTitle('API Mentorat')
    .setDescription(
      'This provid the REST API And WebSocket connection for chat app',
    )
    .setVersion('1.0')
    .addTag('Menroats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // using of globalPipe to trnsoform data retrieving on prisma database

  // app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.use(cors());

  // implementer le logger pour suivre les traces de fonctionnement de son application
  const logger = new Logger('Main');

  // log docs
  const url = `http://localhost:8000`;
  logger.log(`API Document available at ${url}`);
  await app.listen(8000);
}
bootstrap();
