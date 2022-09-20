import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import BaseController from '../base/base.controller';
import { Pager } from '../helpers/Pager';
import { Sorter } from '../helpers/Sorter';
import { RobotFilterDto } from './dto/filter-robot.dto';
import { RobotsService } from './robot.service';

@Controller('robots')
export class RobotsController extends BaseController {
    constructor(private readonly robotService: RobotsService) {
        super();
    }

    @Get()
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
}
