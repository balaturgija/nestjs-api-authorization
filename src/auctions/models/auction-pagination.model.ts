import { AuctionModel } from './auction.model';

export class AuctionPaginationModel {
    constructor(
        readonly page: number,
        readonly size: number,
        readonly total: number,
        readonly items: AuctionModel[]
    ) {}
}
