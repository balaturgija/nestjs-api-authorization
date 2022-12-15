import { Inject, Injectable } from '@nestjs/common';
import { Sequelize, Transaction } from 'sequelize';
import { Provider } from '../constants';
import bcrypt from 'bcryptjs';
import { WalletsService } from '../wallets/wallets.service';
import { RegistrationFailed } from '../auth/exceptions/registration.failed.exception';
import { RolesService } from '../roles/roles.service';
import { UsersRepository } from './users.repository';
import { ValidateUserEmailAndPassModel } from './models/validate-user-email-pass.model';
@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        @Inject(Provider.Sequelize) private readonly sequelize: Sequelize,
        private readonly walletsService: WalletsService,
        private readonly rolesService: RolesService
    ) {}

    async create(
        username: string,
        email: string,
        password: string,
        role: string
    ) {
        const transaction = await this.sequelize.transaction();
        try {
            const roleId = await this.rolesService.findRoleByName(
                role,
                transaction
            );
            const passwordHash = await this.createPassword(password);
            const wallet = await this.walletsService.createAsync(transaction);
            const userCreate = await this.usersRepository.create(
                email,
                username,
                passwordHash,
                roleId,
                wallet.id,
                transaction
            );
            await transaction.commit();
            return userCreate;
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            throw new RegistrationFailed('Registration failed', 400);
        }
    }

    async findUserByEmail(email: string) {
        const user = await this.usersRepository.findByEmail(email);
        return new ValidateUserEmailAndPassModel(
            user.id,
            user.username,
            user.email,
            user.password,
            user.role,
            user.wallet
        );
    }

    private async createPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    async emailExists(email: string): Promise<boolean> {
        const result = await this.usersRepository.findByEmail(email);
        return Boolean(result);
    }

    async getById(id: string, t?: Transaction) {
        return await this.usersRepository.getById(id, t);
    }
}
