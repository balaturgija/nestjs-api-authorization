import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    Res,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { BatteriesService } from './batteries.service';
import { BatteryCreateDto } from './dto/create-battery.dto';
import { BatteryDto } from './dto/battery.dto';
import { BatteryFilterDto } from './dto/filter-battery.dto';
import { BatteryParamsDto } from './dto/params-battery.dto';
import { BatteryUpdateDto } from './dto/update-battery.dto';
import { Role, TableName } from '../constants';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { SampleGuard } from '../auth/guards/sample.guard';
import { RoleGuard } from '../roles/guards/role.guard';
import { Roles } from '../roles/decorators/role.decorator';

@Controller('batteries')
export class BatteriesController {
    constructor(private readonly batteriesService: BatteriesService) {}

    @Get()
    @ApiTags(TableName.Batteries)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
    })
    @HttpCode(HttpStatus.OK)
    async findAll(
        @Res() res: Response,
        @Query() query: BatteryFilterDto
    ): Promise<Response> {
        const result = await this.batteriesService.findAllAsync(query);
        return res.send(result);
    }

    @Get(':id')
    @Roles(Role.Admin, Role.Engineer)
    @UseGuards(
        JwtAuthGuard,
        RoleGuard
        // new SampleGuard('first'),
        // new SampleGuard('second')
    )
    // @UseGuards(new SampleGuard('third'))
    @ApiTags(TableName.Batteries)
    @ApiBearerAuth('access-token')
    @ApiResponse({
        status: HttpStatus.OK,
        type: BatteryDto,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Not found',
    })
    async getById(
        @Res() res: Response,
        @Param() params: BatteryParamsDto
    ): Promise<Response> {
        console.log('\x1b[35m Controller method execution start. \x1b[0m');
        const result = await this.batteriesService.getByIdAsync(params.id);
        if (result !== null) {
            console.log('\x1b[35m Controller method execution end. \x1b[0m');
            return res.send(result);
        }

        return res.status(HttpStatus.NOT_FOUND).send('Battery not found.');
    }

    @Post()
    @ApiTags(TableName.Batteries)
    @Roles(Role.Engineer)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBearerAuth('access-token')
    @ApiResponse({
        status: HttpStatus.CREATED,
        type: BatteryDto,
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Error on create',
    })
    async create(
        @Res() res: Response,
        @Body() body: BatteryCreateDto
    ): Promise<Response> {
        const result = await this.batteriesService.createAsync(body);
        if (result.success) return res.send({ success: true });

        return res.status(HttpStatus.CONFLICT).send(result.errors);
    }

    @Put(':id')
    @ApiTags(TableName.Batteries)
    @ApiResponse({
        status: HttpStatus.OK,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Not found',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
    })
    async update(
        @Res() res: Response,
        @Param() params: BatteryParamsDto,
        @Body() body: BatteryUpdateDto
    ): Promise<Response> {
        const model = await this.batteriesService.getByIdAsync(params.id);
        if (!model)
            return res.send(HttpStatus.NOT_FOUND).send('Battery not found');

        Object.assign(model, body);
        const result = await this.batteriesService.updateAsync(
            params.id,
            JSON.parse(JSON.stringify(model))
        );

        if (result.success) return res.send({ success: true });

        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(result.errors);
    }

    @Delete(':id')
    @ApiTags(TableName.Batteries)
    @ApiResponse({
        status: HttpStatus.OK,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Not found',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Error on delete',
    })
    async delete(
        @Res() res: Response,
        @Param() params: BatteryParamsDto
    ): Promise<Response> {
        const model = await this.batteriesService.getByIdAsync(params.id);
        if (!model)
            return res.send(HttpStatus.NOT_FOUND).send('Battery not found');

        const result = await this.batteriesService.deleteAsync(params.id);
        if (result.success) return res.send({ success: true });

        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(result.errors);
    }
}
