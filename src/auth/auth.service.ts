import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import bcrypt from 'bcryptjs';
import { AuthenticatedUser } from '../users/models/autheticated-user';

@Injectable()
export class AuthService {
    /**
     *
     */
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async getByEmailAsync(email: string): Promise<User | null> {
        return await this.usersService.getUserProfileAsync(email);
    }

    async createToken(tokenOptions: TokenOptions): Promise<string> {
        return await this.jwtService.signAsync(tokenOptions);
    }

    async loginAsync(user: AuthenticatedUser): Promise<string> {
        const result = await this.jwtService.sign({
            username: user.email,
            sub: user.id,
        });
        return result;
    }

    async validatePasswordAsync(
        inputPassword: string,
        usersPasword: string
    ): Promise<boolean> {
        return await bcrypt.compare(inputPassword, usersPasword);
    }
}
