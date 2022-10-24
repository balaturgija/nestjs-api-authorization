import {
    Controller,
    Post,
    UseGuards,
    Res,
    HttpStatus,
    Inject,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
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
    @ApiResponse({ status: 201, type: UserLoginDto })
    @ApiResponse({ status: 401, description: 'Token creation failed.' })
    @ApiResponse({ status: 409, description: 'Unauthorized.' })
    @ApiBody({ type: UserLoginDto })
    @UseGuards(LocalAuthGuard)
    async login(
        @AuthUser() user: User,
        @Res() res: Response
    ): Promise<Response> {
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
        if (!token) return res.send(HttpStatus.CONFLICT);
        const loginResponseData = await this.authService.loginAsync(
            tokenOptions,
            token
        );

        if (!loginResponseData) return res.status(HttpStatus.UNAUTHORIZED);

        return res.status(HttpStatus.CREATED).send(loginResponseData);
    }
}
