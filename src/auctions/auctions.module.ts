import { Module } from '@nestjs/common';
import { AuctionsService } from './services/auctions.service';
import { AuctionsController } from './controllers/auctions.controller';
import { AuctionsRepository } from './repositories/auctions.repository';
import { AuthModule } from '../auth/auth.module';
import { RobotsModule } from '../robots/robots.module';
import { AuctionTokensServices } from './services/auction-tokens.service';
import { AuctionTokensRepository } from './repositories/auction-tokens.repository';
import { AuctionsGateway } from './auctions.gateway';

@Module({
    imports: [AuthModule, RobotsModule],
    controllers: [AuctionsController],
    providers: [
        AuctionsGateway,
        AuctionsService,
        AuctionTokensServices,
        AuctionsRepository,
        AuctionTokensRepository,
    ],
})
export class AuctionsModule {}
