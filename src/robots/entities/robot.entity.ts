import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Table,
} from 'sequelize-typescript';
import { BaseEntity } from '../../base/base.entity';
import { BatteryEntity } from '../../batteries/entities/battery.entity';
import { RobotStatus, TableName } from '../../constants';
import { UserEntity } from '../../users/entities/user.entity';

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

    @Column({
        type: DataType.DECIMAL(9, 2),
        defaultValue: 0,
    })
    startPrice: number;

    @Column({
        type: DataType.DECIMAL(9, 2),
        defaultValue: 0,
    })
    finalPrice: number;

    @Column({
        type: DataType.ENUM(
            RobotStatus.Auction,
            RobotStatus.Collected,
            RobotStatus.Created
        ),
        defaultValue: RobotStatus.Created,
    })
    status: RobotStatus;

    @Column({
        type: DataType.STRING,
    })
    creatorsSignature: string;

    @ForeignKey(() => BatteryEntity)
    @Column({
        type: 'uuid',
    })
    batteryId: string;

    @ForeignKey(() => UserEntity)
    @Column({
        type: 'uuid',
    })
    userId: string;

    /* Associations */
    @BelongsTo(() => BatteryEntity, 'battery_id')
    battery: BatteryEntity;

    @BelongsTo(() => UserEntity, 'user_id')
    user: UserEntity;
}
