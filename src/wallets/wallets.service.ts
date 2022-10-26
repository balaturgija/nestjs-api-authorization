import { Inject, Injectable } from '@nestjs/common';
import { Sequelize, Transaction } from 'sequelize';
import { UserHaveNoWalletException } from '../base/exceptions/user-have-no-wallet.exception';
import { RequestUserProvider } from '../base/request-user.provider';
import { toWalletDto } from '../base/utils/Mapper.util';
import { MoneyAction, Provider } from '../constants';
import { WalletPatchDto } from './dto/patch-wallet.dto';
import { WalletEntity } from './entities/wallet.entity';
import { MoneyTransactionDisabledException } from './exceptions/money-transaction-disabled.exception';

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
            const wallet = await this.findByIdAsync(walletId, transaction);
            await this.patchWaletAmount(
                wallet,
                Number(patchWalletDto.amount),
                action,
                transaction
            );
            await transaction.commit();
            return true;
        } catch (error) {
            await transaction.rollback();
            return false;
        }
    }

    private async patchWaletAmount(
        wallet: Wallet,
        amount: number,
        action: MoneyAction,
        t?: Transaction
    ): Promise<boolean> {
        if (action === MoneyAction.Deposit) {
            wallet.amount += Number(amount);
        }

        if (action === MoneyAction.Withdraw && wallet.amount < amount) {
            throw new MoneyTransactionDisabledException(
                'Transaction declined.'
            );
        }

        if (action === MoneyAction.Withdraw && wallet.amount > amount) {
            wallet.amount -= Number(action);
        }

        return await this.updateAmount(wallet.id, amount, t);
    }

    private async updateAmount(
        id: string,
        amount: number,
        t?: Transaction
    ): Promise<boolean> {
        return (
            (await this.walletRepository.update(
                { amount: amount },
                { where: { id: id }, transaction: t }
            )[0]) > 0
        );
    }
}
