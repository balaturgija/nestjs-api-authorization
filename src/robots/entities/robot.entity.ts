import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Table,
} from 'sequelize-typescript';
import { BaseEntity } from '../../base/base.entity';
import { BatteryEntity } from '../../batteries/entities/battery.entity';
import { TableName } from '../../constants';
import { Robot } from '../interfaces/robot.interface';

@Table({
    tableName: TableName.Robots,
    paranoid: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
})
export class RobotEntity extends BaseEntity<RobotEntity> implements Robot {
    @Column({
        type: DataType.STRING,
        unique: true,
    })
    name: string;

    @ForeignKey(() => BatteryEntity)
    @Column({
        type: 'uuid',
    })
    batteryId: string;

    /* Associations */
    @BelongsTo(() => BatteryEntity, 'battery_id')
    battery: BatteryEntity;
}
