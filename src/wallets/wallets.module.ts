import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { DatabaseModule } from '../database/database.module';
import { WalletsRepository } from './wallets.repository';

@Module({
    imports: [DatabaseModule],
    controllers: [WalletsController],
    providers: [WalletsService, WalletsRepository],
    exports: [WalletsService],
})
export class WalletsModule {}
