import { Exclude } from 'class-transformer';
import { Column, DataType, Table } from 'sequelize-typescript';
import { BaseEntity } from '../../base/base.entity';
import { TableName } from '../../constants';
import { User } from '../interfaces/user.interface';

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
        unique: true,
    })
    username: string;

    @Column({
        type: DataType.STRING(255),
    })
    email: string;

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
