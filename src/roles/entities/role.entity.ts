import { Column, DataType, Table } from 'sequelize-typescript';
import { BaseEntity } from '../../base/base.entity';
import { TableName } from '../../constants';

@Table({
    tableName: TableName.Roles,
    paranoid: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
})
export class RoleEntity extends BaseEntity<RoleEntity> implements Role {
    @Column({
        type: DataType.STRING(255),
        unique: true,
    })
    name: string;

    @Column({
        type: DataType.STRING(255),
        unique: true,
    })
    abrv: string;

    /* Associations */
}
