import { Module } from '@nestjs/common';
import { RobotsService } from './robot.service';
import { RobotsController } from './robot.controller';

@Module({
    imports: [],
    controllers: [RobotsController],
    providers: [RobotsService],
})
export class RobotsModule {}
