import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BatteriesModule } from './batteries/battery.module';
import { DatabaseModule } from './database/database.module';
import { RobotsModule } from './robots/robot.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

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
        RolesModule,
        UsersModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
