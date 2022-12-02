import { Module } from '@nestjs/common';
import { AuctionsService } from './services/auctions.service';
import { AuctionsController } from './controllers/auctions.controller';
import { AuctionsRepository } from './repositories/auctions.repository';
import { AuthModule } from '../auth/auth.module';
import { RobotsModule } from '../robots/robots.module';
import { AuctionsGateway } from './auctions.gateway';
import { BidsModule } from '../bids/bids.module';
import { AuctionUsersServices } from './services/auction-users.service';
import { AuctionUsersRepository } from './repositories/auction-users.repository';

@Module({
    imports: [BidsModule, AuthModule, RobotsModule],
    controllers: [AuctionsController],
    providers: [
        AuctionsGateway,
        AuctionsService,
        AuctionUsersServices,
        AuctionsRepository,
        AuctionUsersRepository,
    ],
})
export class AuctionsModule {}
