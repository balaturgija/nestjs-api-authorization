import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { walletsProviders } from './wallets.providers';

@Module({
    imports: [],
    controllers: [WalletsController],
    providers: [WalletsService, ...walletsProviders],
    exports: [WalletsService],
})
export class WalletsModule {}
