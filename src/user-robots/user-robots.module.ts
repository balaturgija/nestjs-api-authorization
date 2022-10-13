import { Module } from '@nestjs/common';
import { UserRobotsService } from './user-robots.service';
import { UserRobotsController } from './user-robots.controller';

@Module({
  controllers: [UserRobotsController],
  providers: [UserRobotsService]
})
export class UserRobotsModule {}
