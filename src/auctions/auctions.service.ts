import { Inject, Injectable } from '@nestjs/common';
import { Provider } from '../constants';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { AuctionEntity } from './entities/auction.entity';

@Injectable()
export class AuctionsService {
    constructor(
        @Inject(Provider.AuctionRepository)
        private readonly auctionRepository: typeof AuctionEntity
    ) {}
    async create(createAuctionDto: CreateAuctionDto) {
        return await this.auctionRepository.create(createAuctionDto);
    }
}
