import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../users/entities/user.entity';

@Injectable()
export class AuthRepository {
    async emailExists(email: string): Promise<boolean> {
        const user = await UserEntity.findOne({
            where: {
                email: email,
            },
            attributes: ['id'],
            rejectOnEmpty: false,
        });

        return Boolean(user);
    }
}
