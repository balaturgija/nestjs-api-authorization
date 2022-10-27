import { Inject, Injectable } from '@nestjs/common';
import { Sequelize, Transaction } from 'sequelize';
import { UserHaveNoWalletException } from '../base/exceptions/user-have-no-wallet.exception';
import { RequestUserProvider } from '../base/request-user.provider';
import { toWalletDto } from '../base/utils/Mapper.util';
import { MoneyAction, Provider } from '../constants';
import { WalletPatchDto } from './dto/patch-wallet.dto';
import { WalletEntity } from './entities/wallet.entity';
import { MoneyTransactionDisabledException } from './exceptions/money-transaction-disabled.exception';
import { TransactionFailedException } from './exceptions/transaction-failed.exception';

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

    async findByIdAsync(id: string, t?: Transaction): Promise<Wallet | null> {
        const result = await this.walletRepository.findByPk(id, {
            raw: true,
            transaction: t,
        });

        return result ? toWalletDto(result) : null;
    }

    async createAsync(t?: Transaction): Promise<Wallet> {
        return await this.walletRepository.create({}, { transaction: t });
    }

    async moneyTransactionAsync(
        walletId: string,
        patchWalletDto: WalletPatchDto,
        action: MoneyAction
    ): Promise<boolean> {
        if (this.user.walletId !== walletId)
            throw new UserHaveNoWalletException(
                'User does not link with Wallet'
            );

        const transaction = await this.sequelize.transaction();
        try {
            // sequelize read numeric type as string
            const wallet = await this.findByIdAsync(walletId, transaction);
            const calculatedAmount = await this.calculateAmount(
                Number(wallet.amount),
                patchWalletDto.amount,
                action
            );
            await this.updateAmount(wallet.id, calculatedAmount, transaction);
            await transaction.commit();
            return true;
        } catch (error) {
            await transaction.rollback();
            throw new TransactionFailedException('Transaction failed');
        }
    }

    private async calculateAmount(
        walletAmount: number,
        amount: number,
        action: MoneyAction
    ): Promise<number> {
        if (action === MoneyAction.Deposit) {
            walletAmount += Number(amount);
        }

        if (action === MoneyAction.Withdraw && walletAmount < amount) {
            throw new MoneyTransactionDisabledException(
                'Transaction declined.'
            );
        }

        if (action === MoneyAction.Withdraw && walletAmount > amount) {
            walletAmount -= Number(action);
        }

        return walletAmount;
    }

    private async updateAmount(
        id: string,
        amount: number,
        t?: Transaction
    ): Promise<boolean> {
        return (
            (
                await this.walletRepository.update(
                    { amount: amount },
                    { where: { id: id }, transaction: t }
                )
            )[0] > 0
        );
    }
}
