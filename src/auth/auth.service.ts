import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import bcrypt from 'bcryptjs';
import { User } from '../users/interfaces/user.interface';

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
        return await this.usersService.getByEmailAsync(email);
    }

    async validatePasswordAsync(inputPassword, usersPasword): Promise<boolean> {
        return await bcrypt.compare(inputPassword, usersPasword);
    }

    async login(token: any) {
        return {
            access_token: this.jwtService.sign(token),
        };
    }
}
