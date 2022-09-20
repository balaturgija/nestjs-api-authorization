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
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import BaseController from '../base/base.controller';
import { Pager } from '../helpers/Pager';
import { Sorter } from '../helpers/Sorter';
import { BatteriesService } from './batteries.service';
import { BatteryCreateDto } from './dto/battery.create.dto';
import { BatteryDto } from './dto/battery.dto';
import { BatteryFilterDto } from './dto/battery.filter.dto';
import { BatteryParamDto } from './dto/battery.param.dto';
import { BatteryUpdateDto } from './dto/battery.update.dto';
// import { ErrorHandler } from '../helpers/ErrorHandler';
// import { SuccessHandler } from '../helpers/SuccessHandler';
// import { handleSuccess } from '../middleware/handleSuccess';

@Controller('batteries')
export class BatteriesController extends BaseController {
  constructor(private readonly batteriesService: BatteriesService) {
    super();
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async findAll(
    @Res() res: Response,
    @Query() query: BatteryFilterDto,
  ): Promise<Response> {
    const pager = new Pager(query.page, query.rpp);
    const sorter = new Sorter(query.sortBy, query.sortDirection);
    const result = await this.batteriesService.findAllAsync(pager, sorter);
    return this.Ok(res, result);
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: BatteryDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
  async getById(@Res() res: Response, @Param() params: BatteryParamDto) {
    const result = await this.batteriesService.getByIdAsync(params.id);
    if (result != null) return this.Ok(res, result);

    return this.NotFound(res, 'Battery not found.');
  }

  @Post()
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
    @Body() batteryCreateDto: BatteryCreateDto,
  ): Promise<Response> {
    const result = await this.batteriesService.createAsync(batteryCreateDto);
    if (result.success) return this.Created(res, batteryCreateDto);

    return this.Error(res, result.errors);
  }

  @Put(':id')
  async put(
    @Res() res: Response,
    @Param() params: BatteryParamDto,
    @Body() batteryUpdateDto: BatteryUpdateDto,
  ): Promise<Response> {
    const model = await this.batteriesService.getByIdAsync(params.id);
    if (!model) return this.NotFound(res, 'Battery not found.');

    Object.assign(model, batteryUpdateDto);
    const result = await this.batteriesService.updateAsync(
      params.id,
      JSON.parse(JSON.stringify(model)),
    );

    if (result.success) return this.Ok(res);

    return this.Error(res);
  }

  @Delete(':id')
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
    @Param() params: BatteryParamDto,
  ): Promise<Response> {
    const resource = await this.batteriesService.getByIdAsync(params.id);
    if (!resource) return this.NotFound(res, 'Battery not found.');
    const result = await this.batteriesService.deleteAsync(params.id);
    if (result.success) return this.Ok(res);

    return this.Error(res, result.errors);
  }
}
