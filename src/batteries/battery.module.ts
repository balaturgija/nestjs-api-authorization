import { Module } from '@nestjs/common';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { BatteriesController } from './batteries.controller';
import { batteriesProviders } from './batteries.providers';
import { BatteriesService } from './batteries.service';

@Module({
    imports: [],
    controllers: [BatteriesController],
    providers: [BatteriesService, ...batteriesProviders, JwtStrategy],
})
export class BatteriesModule {}
