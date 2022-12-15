import { BidEntity } from '../entities/bid.entity';

export class CreateBidModel {
    constructor(readonly id: string, readonly offerPrice: number) {}

    static fromEntity(entity: BidEntity) {
        return new CreateBidModel(entity.id, entity.offerPrice);
    }

    toJSON() {
        return {
            id: this.id,
            name: this.offerPrice,
        };
    }
}
