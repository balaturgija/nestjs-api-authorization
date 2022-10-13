import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt.auth.guard';
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
        AuthModule,
    ],
    controllers: [],
    providers: [
        {
            provide: 'APP_GUARD',
            useClass: JwtAuthGuard,
        },
    ],
})
export class AppModule {}
