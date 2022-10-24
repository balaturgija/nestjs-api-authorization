import { Injectable } from '@nestjs/common';
import { WalletEntity } from '../entities/wallet.entity';

@Injectable()
export class WalletRepository {
    async getById(id: string): Promise<boolean> {
        const wallet = await WalletEntity.findByPk(id);
        return Boolean(wallet);
    }
}
