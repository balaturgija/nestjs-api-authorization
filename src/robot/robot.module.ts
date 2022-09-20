import { Module } from '@nestjs/common';
import { RobotsService } from './robot.service';
import { RobotsController } from './robot.controller';
import { robotsProviders } from './robots.providers';
import { BaseService } from 'src/base/base.service';

@Module({
    imports: [BaseService],
    controllers: [RobotsController],
    providers: [RobotsService, ...robotsProviders],
})
export class RobotsModule {}
