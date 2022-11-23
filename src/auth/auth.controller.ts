import {
    Controller,
    Post,
    UseGuards,
    Inject,
    HttpCode,
    Body,
    Res,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Role } from '../constants';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserLoginDto } from '../users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { AuthUser } from './decorators/auth-user.decorator';
import { Roles } from './decorators/role.decorator';
import { LocalAuthGuard } from './guards/local.auth.guard';
import { RegistrationGuard } from './guards/registration.guard';

@Controller('auth')
export class AuthController {
    /**
     *
     */
    constructor(
        private authService: AuthService,
        @Inject('SERIALIZER') private readonly serializer: any
    ) {}

    @Post('register')
    @ApiTags('auth')
    @UseGuards(RegistrationGuard)
    @Roles(Role.Collector, Role.Engineer)
    async register(@Body() user: CreateUserDto) {
        const createdUser = await this.authService.create(
            user.username,
            user.email,
            user.password,
            user.role
        );
        return this.serializer.serialize('users', createdUser);
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    @ApiTags('auth')
    @HttpCode(200)
    @ApiBody({ type: UserLoginDto })
    async login(@AuthUser() user, @Res() res: Response) {
        const tokenOptions: TokenOptions = {
            id: user.id,
            username: user.username,
            password: user.password,
            email: user.email,
            roleId: user.roleId,
            walletId: user.walletId,
            wallet: user.wallet,
            role: user.role,
        };

        const token = await this.authService.createToken(tokenOptions);
        res.header('access-token', token);
        res.send(
            this.serializer.serialize('users', {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role.name,
            })
        );
    }
}
