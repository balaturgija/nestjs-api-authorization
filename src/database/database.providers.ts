import { Sequelize } from 'sequelize-typescript';
import { AuctionUserEntity } from '../auctions/entities/auction_user.entity';
import { AuctionEntity } from '../auctions/entities/auction.entity';
import { BatteryEntity } from '../batteries/entities/battery.entity';
import { BidEntity } from '../bids/entities/bid.entity';
import { Provider } from '../constants';
import { RobotEntity } from '../robots/entities/robot.entity';
import { RoleEntity } from '../roles/entities/role.entity';
import { UserEntity } from '../users/entities/user.entity';
import { WalletEntity } from '../wallets/entities/wallet.entity';

export const databaseProviders = [
    {
        provide: Provider.Sequelize,
        useFactory: async () => {
            return new Sequelize({
                dialect: 'postgres',
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                models: [
                    BatteryEntity,
                    WalletEntity,
                    RobotEntity,
                    UserEntity,
                    RoleEntity,
                    BidEntity,
                    AuctionEntity,
                    AuctionUserEntity,
                ],
                define: {
                    underscored: true,
                    paranoid: true,
                },
            });
        },
    },
];
