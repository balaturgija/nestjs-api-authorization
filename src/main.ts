import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SWAGGER_CONFIG } from './constants';
import * as express from 'express';
import * as path from 'path';
import { database } from './database/database.providers';
//import { Cluster } from './cluster';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle(SWAGGER_CONFIG.title)
    .setDescription(SWAGGER_CONFIG.description)
    .setVersion(SWAGGER_CONFIG.version)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    );
  for (const tag of SWAGGER_CONFIG.tags) {
    config.addTag(tag);
  }

  const document = SwaggerModule.createDocument(app, config.build());
  SwaggerModule.setup('api', app, document);

  app.use('/upload', express.static(path.join(process.cwd(), 'upload')));
  app.enableCors();
  await app.listen(3000);
}

//Cluster.register(4, bootstrap());
bootstrap();
