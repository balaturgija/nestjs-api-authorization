import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { SWAGGER_CONFIG } from './constants';
import { SocketIOAdapter } from './socket-io-adapter';
// import * as express from 'express';
//import { Cluster } from './cluster';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

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

    // app.use('/upload', express.static(path.join(process.cwd(), 'upload')));
    app.useWebSocketAdapter(new SocketIOAdapter(app, app.get(ConfigService)));
    await app.listen(3000);
}

//Cluster.register(4, bootstrap());
bootstrap();
