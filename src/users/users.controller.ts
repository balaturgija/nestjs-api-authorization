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
@Controller('users')
export class UsersController extends BaseController {
    constructor(
        private readonly usersService: UsersService,
        private readonly roleService: RolesService
    ) {
        super();
    }

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

        const existingEmail = await this.usersService.getByEmailAsync(
            body.email
        );
        if (existingEmail)
            return this.Conflict(res, 'User with this email already exists.');

        const exisitngUsername = await this.usersService.getByUsernameAsync(
            body.username
        );
        if (exisitngUsername)
            return this.Conflict(res, 'Username already taken.');

        const existingRole = await this.roleService.getByIdAsync(body.roleId);
        if (!existingRole) return this.Conflict(res, 'Role does not exist.');

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(body.password, salt);

        dto.password = hashPassword;
        const result = await this.usersService.createAsync(dto);
        if (result.success) return this.Created(res, result.data);

        return this.Error(res, ['Registration failed.']);
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
