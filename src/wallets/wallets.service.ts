import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { toWalletDto } from '../base/utils/Mapper.util';
import { MoneyAction, Provider } from '../constants';
import { WalletEntity } from './entities/wallet.entity';

@Injectable()
export class WalletsService {
    constructor(
        @Inject(Provider.WalletRepository)
        private readonly walletRepository: typeof WalletEntity,
        @Inject(Provider.Sequelize) private readonly sequelize: Sequelize
    ) {}

    async findByIdAsync(id: string): Promise<Wallet | null> {
        const result = await this.walletRepository.findByPk(id);
        return result ? toWalletDto(result) : null;
    }

    async createAsync(): Promise<Wallet> {
        return await this.walletRepository.create({ amount: 0 });
    }

    async moneyTransactionAsync(
        id: string,
        amount: number,
        action: MoneyAction
    ): Promise<boolean> {
        const transaction = await this.sequelize.transaction();
        try {
            const wallet = await this.walletRepository.findOne({
                where: { id: id },
                transaction: transaction,
            });
            let resultAmount = Number(wallet.amount);

            if (action === MoneyAction.Deposit) resultAmount += Number(amount);
            if (action === MoneyAction.Withdraw) resultAmount -= Number(amount);

            await this.walletRepository.update(
                { amount: resultAmount },
                { where: { id: id }, transaction }
            );
            await transaction.commit();
            return true;
        } catch (error) {
            await transaction.rollback();
            return false;
        }
    }
}
