import {
    Controller,
    Post,
    UseGuards,
    Request,
    Get,
    Body,
    Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { BaseController } from '../base/base.controller';
import { UserLoginDto } from '../users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/publicRoute.decorator';
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
    @Public()
    @UseGuards(LocalAuthGuard)
    @ApiTags('auth')
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

        const token = await this.authService.createToken(tokenOptions);
        if (!token) return this.Conflict(res, 'Token creation failed.');
        const loginResponseData = await this.authService.loginAsync(
            user,
            token
        );

        if (!loginResponseData) return this.Unauthorized(res);

        return this.Created(res, loginResponseData);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiTags('auth')
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
