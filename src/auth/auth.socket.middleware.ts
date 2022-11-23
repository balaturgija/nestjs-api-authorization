import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

export const createTokenMiddleware =
    (jwtService: JwtService) => (socket: Socket & User, next) => {
        const token =
            socket.handshake.auth.token || socket.handshake.headers['token'];

        try {
            const payload = jwtService.verify(token);
            socket.id = payload.id;
            socket.email = payload.email;
            next();
        } catch (error) {
            next(new Error('FORBIDDEN'));
        }
    };
