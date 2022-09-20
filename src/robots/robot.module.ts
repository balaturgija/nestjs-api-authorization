import { Module } from '@nestjs/common';
import { RobotsService } from './robots.service';
import { RobotsController } from './robots.controller';
import { robotsProviders } from './robots.providers';

@Module({
    imports: [],
    controllers: [RobotsController],
    providers: [RobotsService, ...robotsProviders],
})
export class RobotsModule {}
