import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { RolesModule } from '../roles/roles.module';
import { EmailExists } from './validation/email-exists.validation';
import { UserRepository } from './respository/user.repository';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { WalletsModule } from '../wallets/wallets.module';

const JSONAPISerializer = require('json-api-serializer');
@Module({
    imports: [
        RolesModule,
        forwardRef(() => AuthModule),
        DatabaseModule,
        WalletsModule,
    ],
    controllers: [UsersController],
    providers: [UsersService, UserRepository, EmailExists, ...usersProviders],
    exports: [UsersService],
})
export class UsersModule {}
