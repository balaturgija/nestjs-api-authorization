import { INestApplicationContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { ServerOptions, Server } from 'socket.io';
import { createTokenMiddleware } from './auth/auth.socket.middleware';

dotenv.config({
    path: path.resolve(`.env`),
});

export class SocketIOAdapter extends IoAdapter {
    constructor(
        private app: INestApplicationContext,
        private configService: ConfigService
    ) {
        super(app);
    }

    createIOServer(port: number, options?: ServerOptions) {
        const cors = {
            origin: [`http://${process.env.HOST}:${process.env.PORT}`],
        };

        console.log(`Socket server runs on ${cors.origin[0]}`);

        const optionsWithCORS: ServerOptions = {
            ...options,
            cors,
        };

        const jwtService = this.app.get(JwtService);
        const server: Server = super.createIOServer(port, optionsWithCORS);

        server.of('auctions').use(createTokenMiddleware(jwtService));

        return server;
    }
}
