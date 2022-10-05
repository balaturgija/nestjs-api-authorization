import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import bcrypt from 'bcryptjs';
import { toUserDto } from '../helpers/Mapper';
import { UserEntity } from '../users/entities/user.entity';

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

    createToken(tokenOptions: TokenOptions): string {
        return this.jwtService.sign(tokenOptions);
    }

    async loginAsync(
        user: UserEntity,
        token: string
    ): Promise<LoginResponseData> {
        return {
            userTokenData: toUserDto(user),
            token: token,
        };
    }
}
