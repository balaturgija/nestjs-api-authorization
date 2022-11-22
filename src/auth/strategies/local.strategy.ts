import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { RolesService } from '../../roles/roles.service';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
        private readonly rolesService: RolesService
    ) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    async validate(email: string, password: string): Promise<any> {
        const userExists = await this.authService.findUserByEmail(email);
        if (!userExists) {
            throw new HttpException(
                'User with given email does not exists.',
                HttpStatus.NOT_FOUND
            );
        }

        const isPasswordValid = await this.authService.validatePassword(
            password,
            userExists.password
        );
        if (!isPasswordValid) {
            throw new UnauthorizedException('Incorect password.');
        }

        return userExists;
    }
}
