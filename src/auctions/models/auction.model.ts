import { AuctionEntity } from '../entities/auction.entity';

export class AuctionModel {
    constructor(
        readonly id: string,
        readonly startAmount: number,
        readonly currentAmount: number,
        readonly finalAmount: number,
        readonly robotId: string
    ) {}

    static fromEntity(entity: AuctionEntity) {
        return new AuctionModel(
            entity.id,
            entity.startAmount,
            entity.currentAmount,
            entity.finalAmount,
            entity.robotId
        );
    }
}
