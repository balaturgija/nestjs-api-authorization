import { AuctionUserEntity } from '../entities/auction_user.entity';

export class CreateAuctionUserModel {
    constructor(
        readonly id: string,
        readonly userId: string,
        readonly auctionId: string
    ) {}

    static fromEntity(entity: AuctionUserEntity) {
        return new CreateAuctionUserModel(
            entity.id,
            entity.userId,
            entity.auctionId
        );
    }

    toJSON() {
        return {
            id: this.id,
            userId: this.userId,
            auctionId: this.auctionId,
        };
    }
}
