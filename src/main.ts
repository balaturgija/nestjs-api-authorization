import { INestApplication, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { SWAGGER_CONFIG } from './constants';
// import * as express from 'express';
//import { Cluster } from './cluster';
// import * as dotenv from 'dotenv';
// import * as path from 'path';

// dotenv.config({
//     path: path.resolve(`.env`),
// });

function initDocs(app: INestApplication) {
    const config = new DocumentBuilder()
        .setTitle(SWAGGER_CONFIG.title)
        .setDescription(SWAGGER_CONFIG.description)
        .setVersion(SWAGGER_CONFIG.version)
        .addBearerAuth(
            { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
            'access-token'
        );
    for (const tag of SWAGGER_CONFIG.tags) {
        config.addTag(tag);
    }
    const document = SwaggerModule.createDocument(app, config.build());
    SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    initDocs(app);
    // app.use('/upload', express.static(path.join(process.cwd(), 'upload')));
    app.enableCors();
    app.enableVersioning({ type: VersioningType.URI });
    await app.listen(3000);
}

//Cluster.register(4, bootstrap());
bootstrap();
