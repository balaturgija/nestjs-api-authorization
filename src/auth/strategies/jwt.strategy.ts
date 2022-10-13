import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
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
        console.log('\x1b[43m Executing Token Validation\x1b[0m');
        try {
            return {
                id: payload.id,
                username: payload.username,
                email: payload.email,
                roleId: payload.roleId,
                role: payload.role,
            };
        } catch (error) {
            console.log(error);
        }
    }
}
