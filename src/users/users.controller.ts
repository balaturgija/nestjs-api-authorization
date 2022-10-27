import { Body, Controller, HttpCode, Inject, Post, Res } from '@nestjs/common';
import { UserCreateDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { TableName } from '../constants';
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        @Inject('SERIALIZER') private readonly serializer: any
    ) {}

    @Post('register')
    @ApiTags(TableName.Users)
    @HttpCode(200)
    async register(@Res() res: Response, @Body() user: UserCreateDto) {
        const createdUser = await this.usersService.createAsync(user);
        res.send(this.serializer.serialize('users', createdUser));
    }
}
