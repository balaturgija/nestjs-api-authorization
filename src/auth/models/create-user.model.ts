import { UserEntity } from '../../users/entities/user.entity';

export class CreatedUserModel {
    constructor(readonly username: string, readonly email: string) {}

    static fromEntity(entity: UserEntity) {
        return new CreatedUserModel(entity.username, entity.email);
    }

    toJSON() {
        return {
            username: this.username,
            email: this.email,
        };
    }
}
