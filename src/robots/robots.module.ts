import { Module } from '@nestjs/common';
import { RobotsService } from './robots.service';
import { RobotsController } from './robots.controller';
import { robotsProviders } from './robots.providers';
import { UserRobotsModule } from '../user-robots/user-robots.module';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [UserRobotsModule, DatabaseModule],
    controllers: [RobotsController],
    providers: [RobotsService, ...robotsProviders],
    exports: [RobotsService],
})
export class RobotsModule {}
