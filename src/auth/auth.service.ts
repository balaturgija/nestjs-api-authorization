import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import bcrypt from 'bcryptjs';
import { CreatedUserModel } from './models/create-user.model';

@Injectable()
export class AuthService {
    /**
     *
     */
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async create(
        username: string,
        email: string,
        password: string,
        role: string
    ) {
        const result = await this.usersService.create(
            username,
            email,
            password,
            role
        );

        return new CreatedUserModel(result.username, result.email);
    }

    async findUserByEmail(email: string): Promise<User | null> {
        const result = await this.usersService.getUserProfileAsync(email);
        return result ?? null;
    }

    async createToken(tokenOptions: TokenOptions): Promise<string> {
        return await this.jwtService.signAsync(tokenOptions);
    }

    async validatePassword(
        inputPassword: string,
        usersPasword: string
    ): Promise<boolean> {
        return await bcrypt.compare(inputPassword, usersPasword);
    }
}
