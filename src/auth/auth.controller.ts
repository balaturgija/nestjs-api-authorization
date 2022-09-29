import {
    Controller,
    Post,
    UseGuards,
    Request,
    Get,
    Body,
} from '@nestjs/common';
import { UserLoginDto } from '../users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { LocalAuthGuard } from './guards/localAuth.guard';

@Controller('auth')
export class AuthController {
    /**
     *
     */
    constructor(private authService: AuthService) {}
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() userLoginDto: UserLoginDto, @Request() req) {
        const user = req.user;
        const tokenOptions = {
            id: user.id,
            username: user.username,
            email: user.email,
            roleId: user.roleId,
        };

        return this.authService.login(tokenOptions);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
