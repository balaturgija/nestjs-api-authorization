import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
    async getByIdAndWAlletId(id: string, walletId: string): Promise<boolean> {
        const result = await UserEntity.findOne({
            where: {
                [Op.and]: [{ id: id }, { walletId: walletId }],
            },
        });

        return Boolean(result);
    }
}
