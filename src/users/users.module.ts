import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { RolesModule } from '../roles/roles.module';
import { WalletsModule } from '../wallets/wallets.module';

@Module({
    imports: [RolesModule, WalletsModule],
    controllers: [UsersController],
    providers: [UsersService, ...usersProviders],
    exports: [UsersService],
})
export class UsersModule {}
