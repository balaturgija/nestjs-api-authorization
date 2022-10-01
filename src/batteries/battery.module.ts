import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { BatteriesController } from './batteries.controller';
import { batteriesProviders } from './batteries.providers';
import { BatteriesService } from './batteries.service';

@Module({
    imports: [AuthModule],
    controllers: [BatteriesController],
    providers: [BatteriesService, ...batteriesProviders],
})
export class BatteriesModule {}
