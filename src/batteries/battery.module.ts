import { Module } from '@nestjs/common';
import { BatteriesController } from './batteries.controller';
import { batteriesProviders } from './batteries.providers';
import { BatteriesService } from './batteries.service';

@Module({
    imports: [],
    controllers: [BatteriesController],
    providers: [BatteriesService, ...batteriesProviders],
})
export class BatteriesModule {}
