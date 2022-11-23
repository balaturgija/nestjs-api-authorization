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
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BatteriesService } from './batteries.service';
import { CreateBatteryDto } from './dto/create-battery.dto';
import { UpdateBatteryDto } from './dto/update-battery.dto';
import { Role, TableName } from '../constants';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { SortDirection } from '../base/utils/Sorter.util';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/role.decorator';
import { CreateBatteryResponseModel } from './models/create-battery-response.model';
import { BatteryExistsPipe } from './pipes/battery-exists.pipe';
import { CreateBatteryModel } from './models/create-battery.model';

@Controller('batteries')
export class BatteriesController {
    constructor(
        private readonly batteriesService: BatteriesService,
        @Inject('SERIALIZER') private readonly serializer: any
    ) {}

    @Post()
    @ApiTags(TableName.Batteries)
    @HttpCode(201)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.Engineer)
    @ApiBearerAuth('access-token')
    async create(@Body() body: CreateBatteryDto): Promise<Response> {
        const battery = await this.batteriesService.create(body.name);
        return this.serializer.serialize('batteries', battery);
    }

    @Get()
    @ApiTags(TableName.Batteries)
    @HttpCode(200)
    @ApiQuery({
        name: 'page',
        type: 'number',
        required: false,
        description: 'Default 1',
    })
    @ApiQuery({
        name: 'size',
        type: 'number',
        required: false,
        description: 'Default 10',
    })
    @ApiQuery({
        name: 'sortDirection',
        type: 'string',
        enum: SortDirection,
        required: false,
    })
    async findAll(
        @Query('page', ParseIntPipe) page = 1,
        @Query('size', ParseIntPipe) size = 10,
        @Query('sortDirection') sortDirection = SortDirection.Asc
    ) {
        const paginationItems = await this.batteriesService.findAll(
            page,
            size,
            sortDirection
        );
        return this.serializer.serialize(
            'batteriesPagination',
            paginationItems
        );
    }

    @Get(':id')
    @ApiTags(TableName.Batteries)
    @HttpCode(200)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.Engineer)
    @ApiBearerAuth('access-token')
    async findOne(@Param('id', BatteryExistsPipe) id: string) {
        const result = await this.batteriesService.findOne(id);

        return this.serializer.serialize(
            'batteries',
            CreateBatteryResponseModel.fromEntity(result)
        );
    }

    @Patch(':id')
    @ApiTags(TableName.Batteries)
    @HttpCode(204)
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
    @ApiTags(TableName.Batteries)
    @HttpCode(200)
    async delete(@Param('id', BatteryExistsPipe) id: string) {
        await this.batteriesService.delete(id);

        return this.serializer.serialize('batteries', null);
    }
}
