import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    Res,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { BatteriesService } from './batteries.service';
import { BatteryCreateDto } from './dto/create-battery.dto';
import { BatteryDto } from './dto/battery.dto';
import { BatteryFilterDto } from './dto/filter-battery.dto';
import { BatteryParamsDto } from './dto/params-battery.dto';
import { BatteryUpdateDto } from './dto/update-battery.dto';
import { Role, TableName } from '../constants';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { SortDirection } from '../base/utils/Sorter.util';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/role.decorator';

@Controller('batteries')
export class BatteriesController {
    constructor(private readonly batteriesService: BatteriesService) {}

    @Get()
    @ApiTags(TableName.Batteries)
    @ApiQuery({
        name: 'page',
        type: 'number',
        required: false,
        description: 'Default 1',
    })
    @ApiQuery({
        name: 'rpp',
        type: 'number',
        required: false,
        description: 'Default 10',
    })
    @ApiQuery({
        name: 'sortBy',
        type: 'string',
        required: false,
        description: 'default: id, optional: name | created_at',
    })
    @ApiQuery({
        name: 'sortDirection',
        type: 'string',
        enum: SortDirection,
        required: false,
    })
    @ApiResponse({ status: 200, type: BatteryDto, isArray: true })
    async findAll(
        @Res() res: Response,
        @Query() query: BatteryFilterDto
    ): Promise<Response> {
        const result = await this.batteriesService.findAllAsync(query);
        return res.send(result);
    }

    @Get(':id')
    @ApiTags(TableName.Batteries)
    @ApiBearerAuth('access-token')
    @ApiResponse({ status: 200, type: BatteryDto })
    @ApiResponse({ status: 404, description: 'Battery not found.' })
    @Roles(Role.Admin, Role.Engineer)
    @UseGuards(JwtAuthGuard, RoleGuard)
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

        return res.status(HttpStatus.NOT_FOUND);
    }

    @Post()
    @ApiTags(TableName.Batteries)
    @ApiBearerAuth('access-token')
    @ApiResponse({ status: 201, type: BatteryDto })
    @ApiResponse({ status: 409, description: 'Post failed' })
    @Roles(Role.Engineer)
    @UseGuards(JwtAuthGuard, RoleGuard)
    async create(
        @Res() res: Response,
        @Body() body: BatteryCreateDto
    ): Promise<Response> {
        const result = await this.batteriesService.createAsync(body);
        if (result) return res.send(result);

        return res.status(HttpStatus.CONFLICT);
    }

    @Put(':id')
    @ApiTags(TableName.Batteries)
    @ApiResponse({ status: 200, description: 'Update success.' })
    @ApiResponse({ status: 404, description: 'Robot not found.' })
    @ApiResponse({ status: 409, description: 'Update failed.' })
    async update(
        @Res() res: Response,
        @Param() params: BatteryParamsDto,
        @Body() body: BatteryUpdateDto
    ): Promise<Response> {
        const model = await this.batteriesService.getByIdAsync(params.id);
        if (!model)
            return res.send(HttpStatus.NOT_FOUND).send('Battery not found');

        Object.assign(model, body);
        const result = await this.batteriesService.putAsync(
            params.id,
            JSON.parse(JSON.stringify(model))
        );

        if (result) return res.send({ success: true });

        return res.status(HttpStatus.CONFLICT);
    }

    @Delete(':id')
    @ApiTags(TableName.Batteries)
    @ApiResponse({ status: 200, description: 'Delete success.' })
    @ApiResponse({ status: 404, description: 'Battery not found.' })
    @ApiResponse({ status: 409, description: 'Delete failed.' })
    async delete(
        @Res() res: Response,
        @Param() params: BatteryParamsDto
    ): Promise<Response> {
        const model = await this.batteriesService.getByIdAsync(params.id);
        if (!model) return res.status(HttpStatus.NOT_FOUND);

        const result = await this.batteriesService.deleteAsync(params.id);
        if (result) return res.send({ success: true });

        return res.status(HttpStatus.CONFLICT);
    }
}
