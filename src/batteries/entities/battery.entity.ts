import { Exclude } from 'class-transformer';
import { Column, DataType, Table } from 'sequelize-typescript';
import { BaseEntity } from '../../base/base.entity';
import { TableName } from '../../constants';

interface Battery {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

@Table({
    tableName: TableName.Batteries,
    paranoid: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
})
export class BatteryEntity
    extends BaseEntity<BatteryEntity>
    implements Battery
{
    @Column({
        type: DataType.STRING(255),
        unique: true,
    })
    name: string;

    @Exclude()
    createdAt: Date;

    @Exclude()
    updatedAt: Date;

    @Exclude()
    deletedAt: Date;

    /* Associations */
}
