import {
    Controller,
    Post,
    UseGuards,
    Get,
    Res,
    Req,
    HttpStatus,
    UseFilters,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserLoginDto } from '../users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { LocalAuthGuard } from './guards/local.auth.guard';

@Controller('auth')
export class AuthController {
    /**
     *
     */
    constructor(private authService: AuthService) {}

    @Post('login')
    @ApiTags('auth')
    @ApiResponse({ status: 201, type: UserLoginDto })
    @ApiResponse({ status: 401, description: 'Token creation failed.' })
    @ApiResponse({ status: 409, description: 'Unauthorized.' })
    @ApiBody({ type: UserLoginDto })
    @UseGuards(LocalAuthGuard)
    async login(@Req() req, @Res() res: Response): Promise<Response> {
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
        if (!token) return res.send(HttpStatus.CONFLICT);
        const loginResponseData = await this.authService.loginAsync(
            tokenOptions,
            token
        );

        if (!loginResponseData) return res.status(HttpStatus.UNAUTHORIZED);

        return res.status(HttpStatus.CREATED).send(loginResponseData);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiTags('auth')
    @Get('profile')
    getProfile(@Req() req) {
        return req.user;
    }
}
