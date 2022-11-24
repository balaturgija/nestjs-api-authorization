import { Module } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { AuctionsController } from './auctions.controller';
import { AuctionsRepository } from './auctions.repository';
import { AuthModule } from '../auth/auth.module';
import { RobotsModule } from '../robots/robots.module';

@Module({
    imports: [AuthModule, RobotsModule],
    controllers: [AuctionsController],
    providers: [AuctionsService, AuctionsRepository],
})
export class AuctionsModule {}
