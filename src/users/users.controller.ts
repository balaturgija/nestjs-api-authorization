import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UserCreateDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import bcrypt from 'bcryptjs';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TableName } from '../constants';
import { UserDto } from './dto/user.dto';
import { RolesService } from '../roles/roles.service';
import { UserParamsDto } from './dto/params-user.dto';
import { WalletsService } from '../wallets/wallets.service';
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly rolesService: RolesService,
        private readonly walletsService: WalletsService
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
    ): Promise<Response> {
        const dto = new UserCreateDto();
        dto.username = body.username;
        dto.email = body.email;
        dto.roleId = body.roleId;

        const existingEmail = await this.usersService.getByEmailAsync(
            body.email
        );
        if (existingEmail)
            return res.status(409).send({ message: 'Email already taken.' });

        const exisitngUsername = await this.usersService.getByUsernameAsync(
            body.username
        );
        if (exisitngUsername)
            res.status(409).send({ message: 'Username already taken.' });

        const existingRole = await this.rolesService.getByIdAsync(body.roleId);
        if (!existingRole)
            return res.status(404).send({ message: 'Role not found' });

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(body.password, salt);

        const wallet = await this.walletsService.createAsync();

        dto.walletId = wallet.id;
        dto.password = hashPassword;
        const result = await this.usersService.createAsync(dto);
        return res.status(201).send(result);
    }

    @Get(':id')
    @ApiTags(TableName.Users)
    async getUserProfileAsync(
        @Res() res: Response,
        @Param() params: UserParamsDto
    ): Promise<Response> {
        const result = await this.usersService.getUserProfileAsync(params.id);
        return res.status(200).json(result);
    }
}
