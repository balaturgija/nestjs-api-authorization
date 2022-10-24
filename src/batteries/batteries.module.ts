import { Module } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { BatteriesController } from './batteries.controller';
import { batteriesProviders } from './batteries.providers';
import { BatteriesService } from './batteries.service';

@Module({
    imports: [],
    controllers: [BatteriesController],
    providers: [JwtAuthGuard, BatteriesService, ...batteriesProviders],
    exports: [BatteriesService],
})
export class BatteriesModule {}
