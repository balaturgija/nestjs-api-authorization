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
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { SortDirection } from '../base/utils/Sorter';
import { TableName } from '../constants';
import { RobotCreateDto } from './dto/create-robot.dto';
import { RobotFilterDto } from './dto/filter-robot.dto';
import { RobotParamsDto } from './dto/params-robot.dto';
import { RobotDto } from './dto/robot.dto';
import { RobotUpdateDto } from './dto/update-robot.dto';
import { RobotsService } from './robots.service';

@Controller('robots')
export class RobotsController {
    constructor(private readonly robotService: RobotsService) {}

    @Get()
    @ApiTags(TableName.Robots)
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
        description: 'default: id, optional: name | price',
    })
    @ApiQuery({
        name: 'sortDirection',
        type: 'string',
        enum: SortDirection,
        required: false,
    })
    @ApiResponse({ status: 200, type: RobotDto, isArray: true })
    async findAll(
        @Res() res: Response,
        @Query() query: RobotFilterDto
    ): Promise<Response> {
        const result = await this.robotService.findAllAsync(query);
        return res.send(result);
    }

    @Get(':id')
    @ApiTags(TableName.Robots)
    @ApiResponse({ status: 200, type: RobotDto })
    @ApiResponse({ status: 404, description: 'Robot not found.' })
    async getById(
        @Res() res: Response,
        @Param() params: RobotParamsDto
    ): Promise<Response> {
        const result = await this.robotService.getByIdAsync(params.id);
        if (result != null) return res.send(result);

        return res.status(HttpStatus.NOT_FOUND).send('Robot not found');
    }

    @Post()
    @ApiTags(TableName.Robots)
    @ApiResponse({ status: 201, type: RobotDto })
    @ApiResponse({ status: 409, description: 'Post failed' })
    async create(
        @Res() res: Response,
        @Body() body: RobotCreateDto
    ): Promise<Response> {
        const result = await this.robotService.createAsync(body);
        if (result) return res.send(result);

        return res.status(HttpStatus.CONFLICT);
    }

    @Put(':id')
    @ApiTags(TableName.Robots)
    @ApiResponse({ status: 200, description: 'Update success.' })
    @ApiResponse({ status: 404, description: 'Robot not found.' })
    @ApiResponse({ status: 409, description: 'Update failed.' })
    async update(
        @Res() res: Response,
        @Param() params: RobotParamsDto,
        @Body() body: RobotUpdateDto
    ): Promise<Response> {
        const model = await this.robotService.getByIdAsync(params.id);
        if (!model) return res.status(HttpStatus.NOT_FOUND);

        Object.assign(model, body);
        const result = await this.robotService.putAsync(
            params.id,
            JSON.parse(JSON.stringify(model))
        );

        if (result) return res.send({ success: true });

        return res.status(HttpStatus.CONFLICT);
    }

    @Delete(':id')
    @ApiTags(TableName.Robots)
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({ status: 200, description: 'Delete success.' })
    @ApiResponse({ status: 404, description: 'Robot not found.' })
    @ApiResponse({ status: 409, description: 'Delete failed.' })
    async delete(
        @Res() res: Response,
        @Param() params: RobotParamsDto
    ): Promise<Response> {
        const model = await this.robotService.getByIdAsync(params.id);
        if (!model) return res.status(HttpStatus.NOT_FOUND);

        const result = await this.robotService.deleteAsync(params.id);
        if (result) return res.send({ success: true });

        return res.status(HttpStatus.CONFLICT);
    }
}
