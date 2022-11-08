import { Module } from '@nestjs/common';
import { UserRobotsService } from './user-robots.service';
import { UserRobotsController } from './user-robots.controller';
import { userRobotsProviders } from './user-robots.providers';

@Module({
    controllers: [UserRobotsController],
    providers: [UserRobotsService, ...userRobotsProviders],
    exports: [UserRobotsService],
})
export class UserRobotsModule {}
