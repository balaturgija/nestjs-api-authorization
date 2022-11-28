import { Inject, Injectable } from '@nestjs/common';
import { Sequelize, Transaction } from 'sequelize';
import { MoneyAction, Provider } from '../constants';
import { WalletPatchDto } from './dto/patch-wallet.dto';
import { MoneyTransactionDisabledException } from './exceptions/money-transaction-disabled.exception';
import { WalletModel } from './models/wallet.model';
import { WalletsRepository } from './wallets.repository';

@Injectable()
export class WalletsService {
    constructor(
        private readonly walletsRepository: WalletsRepository,
        @Inject(Provider.Sequelize) private readonly sequelize: Sequelize
    ) {}

    async findByIdAsync(id: string, t?: Transaction): Promise<Wallet | null> {
        return await this.walletsRepository.findOne(id, t);
    }

    async createAsync(t?: Transaction): Promise<Wallet> {
        return await this.walletsRepository.create(t);
    }

    async moneyTransaction(
        wallet: Wallet,
        patchWalletDto: WalletPatchDto,
        action: MoneyAction
    ) {
        const transaction = await this.sequelize.transaction();
        try {
            // sequelize read numeric type as string
            const calculatedAmount = await this.calculateAmount(
                Number(wallet.amount),
                patchWalletDto.amount,
                action
            );
            await this.updateAmount(wallet.id, calculatedAmount, transaction);
            const updatedEntity = await this.walletsRepository.findOne(
                wallet.id,
                transaction
            );
            await transaction.commit();
            return WalletModel.fromEntity(updatedEntity);
        } catch (error) {
            await transaction.rollback();
            throw new MoneyTransactionDisabledException(
                `Action: ${action} not allowed`,
                405
            );
        }
    }

    private async calculateAmount(
        walletAmount: number,
        amount: number,
        action: MoneyAction
    ): Promise<number> {
        if (action === 'Deposit') {
            walletAmount += Number(amount);
        }

        if (action === 'Withdraw' && walletAmount < amount) {
            throw new MoneyTransactionDisabledException(
                'Transaction declined.'
            );
        }

        if (action === 'Withdraw' && walletAmount > amount) {
            walletAmount -= Number(action);
        }

        return walletAmount;
    }

    private async updateAmount(
        id: string,
        amount: number,
        t?: Transaction
    ): Promise<boolean> {
        return (await this.walletsRepository.update(id, amount, t))[0] > 0;
    }
}
