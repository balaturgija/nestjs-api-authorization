import { RoleEntity } from '../entities/role.entity';

export class RoleModel {
    constructor(
        readonly id: string,
        readonly name?: string,
        readonly abrv?: string
    ) {}

    static fromEntity(entity: RoleEntity) {
        return new RoleModel(entity.id, entity.name, entity.abrv);
    }
}
