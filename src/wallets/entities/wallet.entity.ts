import { Exclude } from 'class-transformer';
import { Column, DataType, Table } from 'sequelize-typescript';
import { BaseEntity } from '../../base/base.entity';
import { TableName } from '../../constants';

@Table({
    tableName: TableName.Wallets,
    paranoid: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
})
export class WalletEntity extends BaseEntity<WalletEntity> implements Wallet {
    @Column({
        type: DataType.DECIMAL(10, 2),
    })
    amount: number;

    @Exclude()
    createdAt: Date;

    @Exclude()
    updatedAt: Date;

    @Exclude()
    deletedAt: Date;

    /* Associations */
}
