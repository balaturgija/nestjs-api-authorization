import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BatteriesModule } from './batteries/batteries.module';
import { DatabaseModule } from './database/database.module';
import { RobotsModule } from './robots/robots.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { UserRobotsModule } from './user-robots/user-robots.module';
import { WalletsModule } from './wallets/wallets.module';
import { BidsModule } from './bids/bids.module';
import { AuctionsModule } from './auctions/auctions.module';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { GlobalExceptionsFilter } from './base/filters/GlobalExceptions.filter';
import { RequestValidationPipe } from './base/pipes/RequestValidation.pipe';

@Module({
    imports: [
        // load and parse env file
        ConfigModule.forRoot({
            envFilePath: [`./env`],
            isGlobal: true,
            cache: true,
        }),
        DatabaseModule,
        BatteriesModule,
        RobotsModule,
        WalletsModule,
        RolesModule,
        UsersModule,
        AuthModule,
        UserRobotsModule,
        BidsModule,
        AuctionsModule,
    ],
    controllers: [],
    providers: [
        // {
        //     provide: APP_FILTER,
        //     useClass: GlobalExceptionsFilter,
        // },
        {
            provide: APP_PIPE,
            useClass: RequestValidationPipe,
        },
    ],
})
export class AppModule {}
