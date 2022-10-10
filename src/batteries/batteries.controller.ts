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
    Request,
    Res,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import BaseController from '../base/base.controller';
import { Pager } from '../helpers/Pager';
import { Sorter } from '../helpers/Sorter';
import { BatteriesService } from './batteries.service';
import { BatteryCreateDto } from './dto/create-battery.dto';
import { BatteryDto } from './dto/battery.dto';
import { BatteryFilterDto } from './dto/filter-battery.dto';
import { BatteryParamsDto } from './dto/params-battery.dto';
import { BatteryUpdateDto } from './dto/update-battery.dto';
import { TableName } from '../constants';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { SampleGuard } from '../auth/guards/sample.guard';

@Controller('batteries')
export class BatteriesController extends BaseController {
    constructor(private readonly batteriesService: BatteriesService) {
        super();
    }

    @Get()
    @ApiTags(TableName.Batteries)
    @ApiResponse({
        status: HttpStatus.OK,
    })
    async findAll(
        @Res() res: Response,
        @Query() query: BatteryFilterDto
    ): Promise<Response> {
        const pager = new Pager(query.page, query.rpp);
        const sorter = new Sorter(query.sortBy, query.sortDirection);
        const result = await this.batteriesService.findAllAsync(pager, sorter);
        return this.Ok(res, result);
    }

    @Get(':id')
    @UseGuards(
        JwtAuthGuard,
        new SampleGuard('first'),
        new SampleGuard('second')
    )
    //@UseGuards(new SampleGuard('third'))
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
        @Param() params: BatteryParamsDto,
        @Request() req
    ) {
        console.log('Controller method execution start.');
        const result = await this.batteriesService.getByIdAsync(params.id);
        if (result != null) {
            console.log('Controller method execution end.');
            return this.Ok(res, result);
        }

        return this.NotFound(res, 'Battery not found.');
    }

    @Post()
    @ApiTags(TableName.Batteries)
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
        if (result.success) return this.Created(res, body);

        return this.Error(res, result.errors);
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
        if (!model) return this.NotFound(res, 'Battery not found.');

        Object.assign(model, body);
        const result = await this.batteriesService.updateAsync(
            params.id,
            JSON.parse(JSON.stringify(model))
        );

        if (result.success) return this.Ok(res);

        return this.Error(res, result.errors);
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
        if (!model) return this.NotFound(res, 'Battery not found.');
        const result = await this.batteriesService.deleteAsync(params.id);
        if (result.success) return this.Ok(res);

        return this.Error(res, result.errors);
    }
}
