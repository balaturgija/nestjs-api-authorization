import {
    Controller,
    Post,
    UseGuards,
    Res,
    Inject,
    HttpCode,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserLoginDto } from '../users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { AuthUser } from './decorators/auth-user.decorator';
import { LocalAuthGuard } from './guards/local.auth.guard';

@Controller('auth')
export class AuthController {
    /**
     *
     */
    constructor(
        private authService: AuthService,
        @Inject('SERIALIZER') private readonly serializer: any
    ) {}

    @Post('login')
    @ApiTags('auth')
    @HttpCode(200)
    @ApiBody({ type: UserLoginDto })
    @UseGuards(LocalAuthGuard)
    async login(@AuthUser() user: User, @Res() res: Response) {
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
            })
        );
    }
}
