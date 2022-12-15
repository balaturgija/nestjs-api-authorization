import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Sequelize, Transaction } from 'sequelize';
import { Provider, RobotStatus } from '../../constants';
import { RobotsService } from '../../robots/robots.service';
import { UsersService } from '../../users/users.service';
import { WalletsService } from '../../wallets/wallets.service';
import { MoneyRobotSwapException } from '../exceptions/money-robot-swap.exception';
import { AuctionPaginationModel } from '../models/auction-pagination.model';
import { AuctionModel } from '../models/auction.model';
import { AuctionsRepository } from '../repositories/auctions.repository';

@Injectable()
export class AuctionsService {
    constructor(
        private readonly auctionsRepository: AuctionsRepository,
        private readonly walletsService: WalletsService,
        private readonly robotsService: RobotsService,
        private readonly userService: UsersService,
        @Inject(Provider.Sequelize) private readonly sequelize: Sequelize
    ) {}
    async paginate(page: number, size: number, order: 'asc' | 'desc') {
        const result = await this.auctionsRepository.paginate(
            page,
            size,
            order
        );
        return new AuctionPaginationModel(
            page,
            size,
            result.count,
            result.rows.map((auction) => AuctionModel.fromEntity(auction))
        );
    }
    async create(robotId: string, startAmount: number) {
        return await this.auctionsRepository.create(robotId, startAmount);
    }

    async getById(id: string, t?: Transaction) {
        const auction = await this.auctionsRepository.findOne(id, t);

        if (auction) return auction.get();

        return null;
    }

    async existsById(id: string) {
        return await this.auctionsRepository.existsById(id);
    }

    async existByRobotId(robotId: string) {
        return await this.auctionsRepository.existsByRobotId(robotId);
    }

    async updateCurrentAmount(auctionId: string, currentAmount: number) {
        return await this.auctionsRepository.updateCurrentAmount(
            auctionId,
            currentAmount
        );
    }

    async updateFinalAmount(auctionId: string, finalAmount: number) {
        return await this.auctionsRepository.updateFinalAmount(
            auctionId,
            finalAmount
        );
    }

    async swapMoneyAndRobot(
        amount: number,
        auctionId: string,
        winnerUserId: string
    ) {
        const transaction = await this.sequelize.transaction();
        try {
            const auction = await this.getById(auctionId, transaction);
            const robot = await this.robotsService.getById(
                auction.robotId,
                transaction
            );
            const payingUser = await this.userService.getById(
                winnerUserId,
                transaction
            );
            const receivingUser = await this.userService.getById(
                robot.userId,
                transaction
            );
            await this.robotsService.changeUserId(
                robot.id,
                winnerUserId,
                RobotStatus.Collected,
                transaction
            );
            await this.robotsService.changeFinalPrice(
                robot.id,
                Number(amount),
                transaction
            );
            await this.walletsService.swapBetweenWallet(
                Number(amount),
                payingUser.walletId,
                receivingUser.walletId,
                transaction
            );
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw new MoneyRobotSwapException();
        }
    }

    async getByIdAndUserId(id: string, userId: string) {
        const transaction = await this.sequelize.transaction();
        try {
            const auction = await this.getById(id, transaction);
            const robot = await this.robotsService.getById(
                auction.robotId,
                transaction
            );
            if (robot.userId !== userId) {
                throw HttpException;
            }
        } catch (error) {
            if (error instanceof HttpException) {
                throw new HttpException(
                    { message: 'Robot dont belongs to you.' },
                    403
                );
            }
        }
    }

    async delete(id: string) {
        return await this.auctionsRepository.delete(id);
    }
}
