import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Inject,
    Param,
    ParseIntPipe,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { Roles } from '../auth/decorators/role.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { SortDirection } from '../base/utils/Sorter.util';
import { RobotStatus, Role, TableName } from '../constants';
import { RobotCreateDto } from './dto/create-robot.dto';
import { CreateRobotResponseModel } from './models/create-robot-response.model';
import { RobotExistsPipe } from './pipes/robot-exists.pipe';
import { RobotsService } from './robots.service';

@Controller('robots')
export class RobotsController {
    constructor(
        private readonly robotsService: RobotsService,
        @Inject('SERIALIZER') private readonly serializer: any
    ) {}

    @Post()
    @ApiTags(TableName.Robots)
    @HttpCode(201)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.Engineer)
    @ApiBearerAuth('access-token')
    async create(@Body() body: RobotCreateDto, @AuthUser() user) {
        const createdRobot = await this.robotsService.create(
            body.name,
            0,
            body.currentPrice,
            RobotStatus.Created,
            user.username,
            body.batteryId,
            user.id
        );

        return this.serializer.serialize('robots', {
            id: createdRobot.id,
            name: createdRobot.name,
        });
    }

    @Get('collection')
    @ApiTags(TableName.Robots)
    @HttpCode(200)
    @ApiBearerAuth('access-token')
    @Roles(Role.Collector)
    @UseGuards(JwtAuthGuard, RoleGuard)
    async getRobotsCollection(@AuthUser() user) {
        const robots = await this.robotsService.getRobots(user.id);
        return this.serializer.serialize('robots', robots);
    }

    @Get('factory')
    @ApiTags(TableName.Robots)
    @HttpCode(200)
    @ApiBearerAuth('access-token')
    @Roles(Role.Engineer)
    @UseGuards(JwtAuthGuard, RoleGuard)
    async getRobotsFactory(@AuthUser() user) {
        const robots = await this.robotsService.getRobots(user.id);
        return this.serializer.serialize('robots', robots);
    }

    @Get(':id')
    @ApiTags(TableName.Robots)
    @HttpCode(200)
    async findOne(@Param('id', RobotExistsPipe) id: string) {
        const result = await this.robotsService.getById(id);

        return this.serializer.serialize(
            'robots',
            CreateRobotResponseModel.fromEntity(result)
        );
    }

    @Delete(':id')
    @ApiTags(TableName.Robots)
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'Delete success.' })
    @ApiResponse({ status: 404, description: 'Robot not found.' })
    @ApiResponse({ status: 409, description: 'Delete failed.' })
    async delete(@Param('id', RobotExistsPipe) id: string) {
        await this.robotsService.delete(id);
        return this.serializer.serialize('robots', null);
    }
}
