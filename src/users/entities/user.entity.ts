import { Exclude } from 'class-transformer';
import { Column, DataType, Table } from 'sequelize-typescript';
import { BaseEntity } from '../../base/base.entity';
import { TableName } from '../../constants';

interface User {
    id: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

@Table({
    tableName: TableName.Users,
    paranoid: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
})
export class UserEntity extends BaseEntity<UserEntity> implements User {
    @Column({
        type: DataType.STRING(255),
    })
    username: string;

    @Column({
        type: DataType.TEXT,
    })
    password: string;

    @Exclude()
    createdAt: Date;

    @Exclude()
    updatedAt: Date;

    @Exclude()
    deletedAt: Date;

    /* Associations */
}
