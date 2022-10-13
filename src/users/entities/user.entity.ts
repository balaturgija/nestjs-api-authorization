import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Table,
} from 'sequelize-typescript';
import { BaseEntity } from '../../base/base.entity';
import { TableName } from '../../constants';
import { RoleEntity } from '../../roles/entities/role.entity';
import { WalletEntity } from '../../wallets/entities/wallet.entity';

@Table({
    tableName: TableName.Users,
    paranoid: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
})
export class UserEntity extends BaseEntity<UserEntity> implements User {
    @Column({
        type: DataType.STRING,
        unique: true,
    })
    username: string;

    @Column({
        type: DataType.STRING,
    })
    email: string;

    @Column({
        type: DataType.TEXT,
    })
    password: string;

    @ForeignKey(() => RoleEntity)
    @Column({
        type: 'uuid',
    })
    roleId: string;

    @ForeignKey(() => WalletEntity)
    @Column({
        type: 'uuid',
    })
    walletId: string;

    /* Associations */
    @BelongsTo(() => RoleEntity, 'role_id')
    role?: RoleEntity;

    @BelongsTo(() => WalletEntity, 'wallet_id')
    wallet?: WalletEntity;
}
