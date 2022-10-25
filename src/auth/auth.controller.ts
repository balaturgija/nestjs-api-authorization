import { Controller, Post, UseGuards, Res, Inject } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserLoginDto } from '../users/dto/login-user.dto';
import { AuthenticatedUser } from '../users/models/autheticated-user';
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
    async login(@AuthUser() user: AuthenticatedUser, @Res() res: Response) {
        const accessToken = await this.authService.loginAsync(user);

        res.header('access-token', accessToken);
        res.send(this.serializer.serialize('user', user));
    }
}
