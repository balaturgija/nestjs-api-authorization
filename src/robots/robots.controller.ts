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
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { TableName } from '../constants';
import { BaseController } from '../base/base.controller';
import { Pager } from '../helpers/Pager';
import { Sorter } from '../helpers/Sorter';
import { RobotCreateDto } from './dto/create-robot.dto';
import { RobotFilterDto } from './dto/filter-robot.dto';
import { RobotParamsDto } from './dto/params-robot.dto';
import { RobotDto } from './dto/robot.dto';
import { RobotUpdateDto } from './dto/update-robot.dto';
import { RobotsService } from './robots.service';

@Controller('robots')
export class RobotsController extends BaseController {
    constructor(private readonly robotService: RobotsService) {
        super();
    }

    @Get()
    @ApiTags(TableName.Robots)
    @ApiResponse({
        status: HttpStatus.OK,
    })
    async findAll(
        @Res() res: Response,
        @Query() query: RobotFilterDto
    ): Promise<Response> {
        const pager = new Pager(query.page, query.rpp);
        const sorter = new Sorter(query.sortBy, query.sortDirection);
        const result = await this.robotService.findAllAsync(pager, sorter);
        return this.Ok(res, result);
    }

    @Get(':id')
    @ApiTags(TableName.Robots)
    @ApiResponse({
        status: HttpStatus.OK,
        type: RobotDto,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Robot not found.',
    })
    async getById(
        @Res() res: Response,
        @Param() params: RobotParamsDto
    ): Promise<Response> {
        const result = await this.robotService.getByIdAsync(params.id);
        if (result != null) return this.Ok(res, result);

        return this.NotFound(res, 'Robot not found.');
    }

    @Post()
    @ApiTags(TableName.Robots)
    @ApiResponse({
        status: HttpStatus.CREATED,
        type: RobotDto,
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Error on create.',
    })
    async create(
        @Res() res: Response,
        @Body() body: RobotCreateDto
    ): Promise<Response> {
        const result = await this.robotService.createAsync(body);
        if (result.success) return this.Created(res, body);

        return this.Error(res, result.errors);
    }

    @Put(':id')
    @ApiTags(TableName.Robots)
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
        @Param() params: RobotParamsDto,
        @Body() body: RobotUpdateDto
    ): Promise<Response> {
        const model = await this.robotService.getByIdAsync(params.id);
        if (!model) return this.NotFound(res, 'Robot not found.');

        Object.assign(model, body);
        const result = await this.robotService.putAsync(
            params.id,
            JSON.parse(JSON.stringify(model))
        );

        if (result.success) return this.Ok(res);

        return this.Error(res, result.errors);
    }

    @Delete(':id')
    @ApiTags(TableName.Robots)
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
        @Param() params: RobotParamsDto
    ): Promise<Response> {
        const model = await this.robotService.getByIdAsync(params.id);
        if (!model) return this.NotFound(res, 'Robot not found.');
        const result = await this.robotService.deleteAsync(params.id);
        if (result.success) return this.Ok(res);

        return this.Error(res, result.errors);
    }
}
