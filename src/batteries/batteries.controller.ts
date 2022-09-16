import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import BaseController from '../base/base.controller';
import { BatteriesService } from './batteries.service';
import { BatteryCreateDto } from './dto/battery.create.dto';
import { BatteryDto } from './dto/battery.dto';
// import { ErrorHandler } from '../helpers/ErrorHandler';
// import { SuccessHandler } from '../helpers/SuccessHandler';
// import { handleSuccess } from '../middleware/handleSuccess';

@Controller('batteries')
export class BatteriesController extends BaseController {
  constructor(private readonly batteriesService: BatteriesService) {
    super();
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
    if (result.success) return this.Created(res, result);

    return this.Error(res, result.errors);
  }
}
