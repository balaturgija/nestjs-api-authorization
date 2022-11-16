import { Module } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { BatteriesController } from './batteries.controller';
import { BatteriesService } from './batteries.service';
import { BatteryExistsPipe } from './pipes/battery-exists.pipe';
import { BatteriesRepository } from './repositories/batteries.repository';

@Module({
    imports: [],
    controllers: [BatteriesController],
    providers: [
        JwtAuthGuard,
        BatteriesService,
        BatteriesRepository,
        BatteryExistsPipe,
    ],
    exports: [BatteriesService, BatteryExistsPipe],
})
export class BatteriesModule {}
