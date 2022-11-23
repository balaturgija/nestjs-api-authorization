import { Module } from '@nestjs/common';
import { RobotsService } from './robots.service';
import { RobotsController } from './robots.controller';
import { DatabaseModule } from '../database/database.module';
import { RobotsRepository } from './robots.repository';

@Module({
    imports: [DatabaseModule],
    controllers: [RobotsController],
    providers: [RobotsService, RobotsRepository],
    exports: [RobotsService],
})
export class RobotsModule {}
