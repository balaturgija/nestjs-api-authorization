import { Provider } from '../constants';
import { AuctionEntity } from './entities/auction.entity';

export const auctionsProviders = [
    {
        provide: Provider.AuctionRepository,
        useValue: AuctionEntity,
    },
];
