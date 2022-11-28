import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    /**
     *
     */
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: TokenOptions) {
        console.log('\x1b[43m Executing Jwt Strategy Token Validation\x1b[0m');
        Number(payload.wallet.amount);
        try {
            return {
                id: payload.id,
                username: payload.username,
                email: payload.email,
                roleId: payload.roleId,
                walletId: payload.walletId,
                wallet: payload.wallet,
                role: payload.role,
            };
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }
}
