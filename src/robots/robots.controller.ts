import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Inject,
    Param,
    Post,
} from '@nestjs/common';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { RobotAuthChallenge } from '../auth/decorators/robot-auth-challenge';
import { Roles } from '../auth/decorators/role.decorator';
import { RobotStatus, Role } from '../constants';
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
    @HttpCode(201)
    @RobotAuthChallenge()
    @Roles(Role.Engineer)
    async create(@Body() body: RobotCreateDto, @AuthUser() user) {
        const createdRobot = await this.robotsService.create(
            body.name,
            body.startPrice,
            0,
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
    @HttpCode(200)
    @RobotAuthChallenge()
    @Roles(Role.Collector)
    async getRobotsCollection(@AuthUser() user) {
        const robots = await this.robotsService.getRobots(user.id);
        return this.serializer.serialize('robots', robots);
    }

    @Get('factory')
    @HttpCode(200)
    @RobotAuthChallenge()
    @Roles(Role.Engineer)
    async getRobotsFactory(@AuthUser() user) {
        const robots = await this.robotsService.getRobots(user.id);
        return this.serializer.serialize('robots', robots);
    }

    @Get(':id')
    @HttpCode(200)
    @RobotAuthChallenge()
    async findOne(@Param('id', RobotExistsPipe) id: string) {
        const result = await this.robotsService.getById(id);

        return this.serializer.serialize(
            'robots',
            CreateRobotResponseModel.fromEntity(result)
        );
    }

    @Delete(':id')
    @HttpCode(200)
    @RobotAuthChallenge()
    async delete(@Param('id', RobotExistsPipe) id: string) {
        await this.robotsService.delete(id);
        return this.serializer.serialize('robots', null);
    }
}
