import {
    Controller,
    Post,
    UseGuards,
    Get,
    Body,
    Res,
    Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { BaseController } from '../base/base.controller';
import { UserLoginDto } from '../users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { LocalAuthGuard } from './guards/local.auth.guard';

@Controller('auth')
export class AuthController extends BaseController {
    /**
     *
     */
    constructor(private authService: AuthService) {
        super();
    }
    @UseGuards(LocalAuthGuard)
    @ApiTags('auth')
    @Post('login')
    async login(
        @Body() userLoginDto: UserLoginDto,
        @Req() req,
        @Res() res: Response
    ): Promise<Response> {
        const user: User = req.user;
        const tokenOptions: TokenOptions = {
            id: user.id,
            username: user.username,
            password: user.password,
            email: user.email,
            roleId: user.roleId,
            walletId: user.walletId,
            role: user.role,
        };

        const token = await this.authService.createToken(tokenOptions);
        if (!token) return this.Conflict(res, 'Token creation failed.');
        const loginResponseData = await this.authService.loginAsync(
            tokenOptions,
            token
        );

        if (!loginResponseData) return this.Unauthorized(res);

        return this.Created(res, loginResponseData);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiTags('auth')
    @Get('profile')
    getProfile(@Req() req) {
        return req.user;
    }
}
