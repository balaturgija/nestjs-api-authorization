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
import { BaseModule } from './base/base.module';
import { GlobalExceptionsFilter } from './base/filters/GlobalExceptions.filter';

@Module({
    imports: [
        // load and parse env file
        ConfigModule.forRoot({
            envFilePath: [`./env`],
            isGlobal: true,
            cache: true,
        }),
        DatabaseModule,
        BaseModule,
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
            provide: APP_FILTER,
            useClass: GlobalExceptionsFilter,
        },
        {
            provide: APP_PIPE,
            useClass: RequestBodyValidatePipe,
        },
    ],
})
export class AppModule implements OnModuleInit {
    constructor(@Inject('SERIALIZER') private readonly serializer: any) {}
    onModuleInit(): any {
        this.serializer.register('user', {
            id: 'id',
            links: {
                self: function (data: any) {
                    return '/user/' + data.id;
                },
            },
        });
    }
}
