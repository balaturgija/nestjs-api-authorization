import { WalletEntity } from '../entities/wallet.entity';

export class WalletModel {
    constructor(readonly id: string, readonly amount: number) {}

    static fromEntity(entity: WalletEntity) {
        return new WalletModel(entity.id, entity.amount);
    }

    toJSON() {
        return {
            id: this.id,
            amount: this.amount,
        };
    }
}
