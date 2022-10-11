import {
    Controller,
    Post,
    UseGuards,
    Request,
    Get,
    Body,
    Res,
} from '@nestjs/common';
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
    @Post('login')
    async login(
        @Body() userLoginDto: UserLoginDto,
        @Request() req,
        @Res() res: Response
    ): Promise<Response> {
        const user = req.user;
        const tokenOptions: TokenOptions = {
            id: user.id,
            username: user.username,
            password: user.password,
            email: user.email,
            roleId: user.roleId,
            role: user.role,
        };

        const token = this.authService.createToken(tokenOptions);
        if (!token) return this.Conflict(res, 'Token creation failed');
        const loginResponseData = await this.authService.loginAsync(
            user,
            token
        );

        return this.Created(res, loginResponseData);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
