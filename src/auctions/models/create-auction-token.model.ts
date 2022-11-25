import { AuctionTokenEntity } from '../entities/auction-token.entity';

export class CreateAuctionTokenModel {
    constructor(readonly id: string, readonly token: string) {}

    static fromEntity(entity: AuctionTokenEntity) {
        return new CreateAuctionTokenModel(entity.id, entity.token);
    }

    toJSON() {
        return {
            id: this.id,
            token: this.token,
        };
    }
}
