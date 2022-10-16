import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Res,
} from '@nestjs/common';
import { BaseController } from '../base/base.controller';
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
        status: HttpStatus.CREATED,
        type: UserDto,
    })
    @ApiResponse({
        status: HttpStatus.CONFLICT,
        description: 'User with this email already exists.',
    })
    @ApiResponse({
        status: HttpStatus.CONFLICT,
        description: 'Username already taken.',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
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
        //create wallet

        const existingEmail = await this.usersService.getByEmailAsync(
            body.email
        );
        if (existingEmail) return res.status(HttpStatus.CONFLICT);

        const exisitngUsername = await this.usersService.getByUsernameAsync(
            body.username
        );
        if (exisitngUsername) return res.status(HttpStatus.CONFLICT);

        const existingRole = await this.rolesService.getByIdAsync(body.roleId);
        if (!existingRole) return res.status(HttpStatus.CONFLICT);

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(body.password, salt);

        const wallet = await this.walletsService.createAsync();
        if (!wallet) return res.status(HttpStatus.CONFLICT);

        dto.walletId = wallet.id;
        dto.password = hashPassword;
        const result = await this.usersService.createAsync(dto);
        if (result) return res.status(HttpStatus.CREATED).send(result);

        return res.status(HttpStatus.INTERNAL_SERVER_ERROR);
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
