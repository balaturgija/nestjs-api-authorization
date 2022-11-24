import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

export const createTokenMiddleware =
    (jwtService: JwtService) => (socket: Socket & AuctionToken, next) => {
        const token =
            socket.handshake.auth.token ||
            socket.handshake.headers['auction-token'];

        try {
            const payload = jwtService.verify(token);
            socket.user = payload.user;
            socket.auctionId = payload.auctionId;
            next();
        } catch (error) {
            next(new Error('FORBIDDEN'));
        }
    };
