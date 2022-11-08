import { Inject, Module, OnModuleInit } from '@nestjs/common';
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
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { RequestBodyValidatePipe } from './base/pipes/RequestValidation.pipe';
import { GlobalExceptionsFilter } from './base/filters/GlobalExceptions.filter';
import { BaseModule } from './base/base.module';

@Module({
    imports: [
        // load and parse env file
        ConfigModule.forRoot({
            envFilePath: [`./env`],
            isGlobal: true,
            cache: true,
        }),
        BaseModule,
        AuthModule,
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
        {
            provide: APP_PIPE,
            useClass: RequestBodyValidatePipe,
        },
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionsFilter,
        },
    ],
})
export class AppModule implements OnModuleInit {
    constructor(@Inject('SERIALIZER') private readonly serializer: any) {}
    onModuleInit(): any {
        this.serializer.register('users', {
            id: 'id',
            links: {
                self: function (data) {
                    return '/users/' + data.id;
                },
            },
        });
        this.serializer.register('auctions', {
            id: 'id',
            links: {
                self: function (data) {
                    return '/auctions/' + data.id;
                },
            },
        });
        this.serializer.register('robots', {
            id: 'id',
            links: {
                self: function (data) {
                    return '/robots/' + data.id;
                },
            },
        });
    }
}
