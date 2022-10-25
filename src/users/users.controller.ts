import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    Post,
    Res,
} from '@nestjs/common';
import { UserCreateDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TableName } from '../constants';
import { UserDto } from './dto/user.dto';
import { RolesService } from '../roles/roles.service';
import { UserParamsDto } from './dto/params-user.dto';
import { AuthService } from '../auth/auth.service';
@Controller('users')
export class UsersController {
    constructor(
        @Inject('SERIALIZER') private readonly serializer: any,
        private readonly usersService: UsersService,
        private readonly rolesService: RolesService,
        private readonly authService: AuthService
    ) {}

    @Post('register')
    @ApiTags(TableName.Users)
    @ApiResponse({
        status: 201,
        type: UserDto,
    })
    @ApiResponse({
        status: 404,
        description: 'Role not found.',
    })
    @ApiResponse({
        status: 409,
        description: 'Email already taken.',
    })
    @ApiResponse({
        status: 409,
        description: 'Username already taken.',
    })
    @ApiResponse({
        status: 500,
        description: 'Registration failed.',
    })
    async register(
        @Res() res: Response,
        @Body() body: UserCreateDto
    ): Promise<void> {
        const createdUser = await this.usersService.createAsync(body);

        res.header(
            'access-token',
            await this.authService.loginAsync(createdUser)
        );
        res.send(this.serializer.serialize('user', createdUser));
    }
}
