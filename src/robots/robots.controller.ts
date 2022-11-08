import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Inject,
    Param,
    Post,
    Put,
    Query,
    Res,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { Roles } from '../auth/decorators/role.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { SortDirection } from '../base/utils/Sorter.util';
import { Role, TableName } from '../constants';
import { UserRobotsFilterDto } from '../users/dto/filter-user-robots.dto';
import { RobotCreateDto } from './dto/create-robot.dto';
import { RobotFilterDto } from './dto/filter-robot.dto';
import { RobotParamsDto } from './dto/params-robot.dto';
import { RobotDto } from './dto/robot.dto';
import { RobotUpdateDto } from './dto/update-robot.dto';
import { RobotsService } from './robots.service';

@Controller('robots')
export class RobotsController {
    constructor(
        private readonly robotsService: RobotsService,
        @Inject('SERIALIZER') private readonly serializer: any
    ) {}

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
        const result = await this.robotsService.findAllAsync(query);
        return res.send(result);
    }

    @Get('collection')
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
        description: 'default: id, optional: name | created_at',
    })
    @ApiQuery({
        name: 'sortDirection',
        type: 'string',
        enum: SortDirection,
        required: false,
    })
    @ApiBearerAuth('access-token')
    @Roles(Role.Collector)
    @UseGuards(JwtAuthGuard, RoleGuard)
    async getRobotsCollection(
        @Res() res: Response,
        @AuthUser() user,
        @Query() query: UserRobotsFilterDto
    ) {
        const robots = await this.robotsService.getRobots(query, user);
        res.send(robots);
    }

    @Get('factory')
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
        description: 'default: id, optional: name | created_at',
    })
    @ApiQuery({
        name: 'sortDirection',
        type: 'string',
        enum: SortDirection,
        required: false,
    })
    @ApiBearerAuth('access-token')
    @Roles(Role.Engineer)
    @UseGuards(JwtAuthGuard, RoleGuard)
    async getRobotsFactory(
        @Res() res: Response,
        @AuthUser() user,
        @Query() query: UserRobotsFilterDto
    ) {
        const robots = await this.robotsService.getRobots(query, user);
        res.send(this.serializer.serialize('robots', robots));
    }

    @Get(':id')
    @ApiTags(TableName.Robots)
    @ApiResponse({ status: 200, type: RobotDto })
    @ApiResponse({ status: 404, description: 'Robot not found.' })
    async getById(
        @Res() res: Response,
        @Param() params: RobotParamsDto
    ): Promise<Response> {
        const result = await this.robotsService.getByIdAsync(params.id);
        if (result != null) return res.send(result);

        return res.status(HttpStatus.NOT_FOUND).send('Robot not found');
    }

    @Post()
    @ApiTags(TableName.Robots)
    @ApiResponse({ status: 201, type: RobotDto })
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.Engineer)
    @ApiBearerAuth('access-token')
    async create(
        @Res() res: Response,
        @Body() body: RobotCreateDto,
        @AuthUser() user
    ) {
        const robot = await this.robotsService.createAsync(body, user);
        res.send(
            this.serializer.serialize('robots', {
                id: robot.id,
                name: robot.name,
            })
        );
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
        const model = await this.robotsService.getByIdAsync(params.id);
        if (!model) return res.status(HttpStatus.NOT_FOUND);

        Object.assign(model, body);
        const result = await this.robotsService.putAsync(
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
        const model = await this.robotsService.getByIdAsync(params.id);
        if (!model) return res.status(HttpStatus.NOT_FOUND);

        const result = await this.robotsService.deleteAsync(params.id);
        if (result) return res.send({ success: true });

        return res.status(HttpStatus.CONFLICT);
    }
}
