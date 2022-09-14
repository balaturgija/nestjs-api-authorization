import { Body, Controller, HttpStatus, Next, Post, Res } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { ErrorHandler } from 'src/helpers/ErrorHandler';
import { SuccessHandler } from 'src/helpers/SuccessHandler';
import { handleSuccess } from 'src/middleware/handleSuccess';
import { BatteriesService } from './batteries.service';
import { BatteryCreateDto } from './dto/battery.create.dto';
import { BatteryDto } from './dto/battery.dto';

@Controller('batteries')
export class BatteriesController {
  constructor(private readonly batteriesService: BatteriesService) {}

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
    @Next() next: any,
  ) {
    const dto: BatteryCreateDto = batteryCreateDto;
    const result = await this.batteriesService.createAsync(dto);
    if (result.success)
      return handleSuccess(
        new SuccessHandler(HttpStatus.OK, result.data[0]),
        res,
      );

    return next(
      new ErrorHandler(
        HttpStatus.INTERNAL_SERVER_ERROR,
        result.errors.join(','),
      ),
    );
  }
}
