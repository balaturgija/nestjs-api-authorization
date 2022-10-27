import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Provider } from '../constants';
import { AuthRepository } from './repository/auth.repository';
import { EmailExists } from './validation/email-exists.validation';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const JSONAPISerializer = require('json-api-serializer');
@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '24h' },
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        AuthRepository,
        EmailExists,
        {
            provide: Provider.Local,
            useClass: LocalStrategy,
        },
        {
            provide: Provider.Jwt,
            useClass: JwtStrategy,
        },
    ],
})
export class AuthModule {}
