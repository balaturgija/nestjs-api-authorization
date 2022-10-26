import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { UserHaveNoWalletException } from '../base/exceptions/user-have-no-wallet.exception';
import { RequestUserProvider } from '../base/request-user.provider';
import { toWalletDto } from '../base/utils/Mapper.util';
import { MoneyAction, Provider } from '../constants';
import { WalletEntity } from './entities/wallet.entity';

@Injectable()
export class WalletsService {
    private get user(): User {
        return this.requestUserProvider.user;
    }

    constructor(
        @Inject(Provider.WalletRepository)
        private readonly walletRepository: typeof WalletEntity,
        @Inject(Provider.Sequelize) private readonly sequelize: Sequelize,
        private readonly requestUserProvider: RequestUserProvider
    ) {}

    async findByIdAsync(id: string): Promise<Wallet | null> {
        const result = await this.walletRepository.findByPk(id);
        return result ? toWalletDto(result) : null;
    }

    async createAsync(): Promise<Wallet> {
        return await this.walletRepository.create({ amount: 0 });
    }

    async moneyTransactionAsync(
        walletId: string,
        patchWalletDto,
        action: MoneyAction
    ): Promise<boolean> {
        if (this.user.walletId !== walletId)
            throw new UserHaveNoWalletException(
                'User does not link with Wallet'
            );

        const transaction = await this.sequelize.transaction();
        try {
            const wallet = await this.walletRepository.findOne({
                where: { id: walletId },
                transaction: transaction,
            });
            let resultAmount = Number(wallet.amount);

            if (action === MoneyAction.Deposit)
                resultAmount += Number(patchWalletDto.amount);
            if (action === MoneyAction.Withdraw)
                resultAmount -= Number(patchWalletDto.amount);

            await this.walletRepository.update(
                { amount: resultAmount },
                { where: { id: walletId }, transaction }
            );
            await transaction.commit();
            return true;
        } catch (error) {
            await transaction.rollback();
            return false;
        }
    }
}
