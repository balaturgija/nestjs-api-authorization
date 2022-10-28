import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import bcrypt from 'bcryptjs';
import { UserCreateDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
    /**
     *
     */
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async createAsync(user: UserCreateDto) {
        return await this.usersService.createAsync(user);
    }

    async getByEmailAsync(email: string): Promise<User | null> {
        const result = await this.usersService.getUserProfileAsync(email);
        return result ?? null;
    }

    async createToken(tokenOptions: TokenOptions): Promise<string> {
        return await this.jwtService.signAsync(tokenOptions);
    }

    async validatePasswordAsync(
        inputPassword: string,
        usersPasword: string
    ): Promise<boolean> {
        return await bcrypt.compare(inputPassword, usersPasword);
    }
}
