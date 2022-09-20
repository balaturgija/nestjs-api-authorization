import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BatteriesModule } from './batteries/battery.module';
import { DatabaseModule } from './database/database.module';
import { RobotsModule } from './robot/robot.module';

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
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
