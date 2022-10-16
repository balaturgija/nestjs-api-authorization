import { Inject, Injectable } from '@nestjs/common';
import { Provider } from '../constants';
import { WalletEntity } from './entities/wallet.entity';

@Injectable()
export class WalletsService {
    constructor(
        @Inject(Provider.WalletRepository)
        private readonly walletRepository: typeof WalletEntity
    ) {}

    async createAsync(): Promise<Wallet> {
        return await this.walletRepository.create({ amount: 0 });
    }
}
