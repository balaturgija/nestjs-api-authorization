import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Inject,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { BatteriesService } from './batteries.service';
import { CreateBatteryDto } from './dto/create-battery.dto';
import { UpdateBatteryDto } from './dto/update-battery.dto';
import { Roles } from '../auth/decorators/role.decorator';
import { CreateBatteryResponseModel } from './models/create-battery-response.model';
import { BatteryExistsPipe } from './pipes/battery-exists.pipe';
import { CreateBatteryModel } from './models/create-battery.model';
import { Pagination } from '../base/decorators/pagination.decorator';
import { BatteryAuthChallenge } from '../auth/decorators/battery-auth-challenge';
import { Role } from '../constants';

@Controller('batteries')
export class BatteriesController {
    constructor(
        private readonly batteriesService: BatteriesService,
        @Inject('SERIALIZER') private readonly serializer: any
    ) {}

    @Post()
    @HttpCode(201)
    @BatteryAuthChallenge()
    @Roles(Role.Engineer)
    async create(@Body() body: CreateBatteryDto): Promise<Response> {
        const battery = await this.batteriesService.create(body.name);
        return this.serializer.serialize('batteries', battery);
    }

    @Get()
    @HttpCode(200)
    @BatteryAuthChallenge()
    @Roles(Role.Engineer)
    @Pagination()
    async findAll(
        @Query('page', ParseIntPipe) page = 1,
        @Query('size', ParseIntPipe) size = 10,
        @Query('direction') direction
    ) {
        const paginationItems = await this.batteriesService.paginate(
            page,
            size,
            direction
        );
        return this.serializer.serialize(
            'batteriesPagination',
            paginationItems
        );
    }

    @Get(':id')
    @HttpCode(200)
    @BatteryAuthChallenge()
    @Roles(Role.Engineer)
    async findOne(@Param('id', BatteryExistsPipe) id: string) {
        const result = await this.batteriesService.findOne(id);

        return this.serializer.serialize(
            'batteries',
            CreateBatteryResponseModel.fromEntity(result)
        );
    }

    @Patch(':id')
    @HttpCode(204)
    @BatteryAuthChallenge()
    @Roles(Role.Engineer)
    async update(
        @Param('id', BatteryExistsPipe) id: string,
        @Body() request: UpdateBatteryDto
    ) {
        await this.batteriesService.update(id, request.name);

        return this.serializer.serialize(
            'batteries',
            CreateBatteryModel.fromEntity(
                await this.batteriesService.findOne(id)
            )
        );
    }

    @Delete(':id')
    @HttpCode(200)
    @BatteryAuthChallenge()
    @Roles(Role.Engineer)
    async delete(@Param('id', BatteryExistsPipe) id: string) {
        await this.batteriesService.delete(id);

        return this.serializer.serialize('batteries', null);
    }
}
