import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { walletsProviders } from './wallets.providers';
import { DatabaseModule } from '../database/database.module';
import { RequestUserProvider } from '../base/request-user.provider';
import { WalletRepository } from './repository/wallet.repository';

@Module({
    imports: [DatabaseModule],
    controllers: [WalletsController],
    providers: [
        RequestUserProvider,
        WalletRepository,
        WalletsService,
        ...walletsProviders,
    ],
    exports: [WalletsService],
})
export class WalletsModule {}
