import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    /**
     *
     */
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    async validate(email: string, password: string): Promise<any> {
        console.log('\x1b[43m Executing Credentials Validation\x1b[0m');
        const userExists = await this.authService.getByEmailAsync(email);
        if (!userExists) {
            throw new HttpException(
                'User with given email does not exists.',
                HttpStatus.NOT_FOUND
            );
        }

        const isPasswordValid = await this.authService.validatePasswordAsync(
            password,
            userExists.password
        );
        if (!isPasswordValid) {
            throw new HttpException('Incorect password.', HttpStatus.FORBIDDEN);
        }

        return userExists;
    }
}
