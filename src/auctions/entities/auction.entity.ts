import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Table,
} from 'sequelize-typescript';
import { BaseEntity } from '../../base/base.entity';
import { TableName } from '../../constants';
import { RobotEntity } from '../../robots/entities/robot.entity';

@Table({
    tableName: TableName.Auctions,
    paranoid: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
})
export class AuctionEntity
    extends BaseEntity<AuctionEntity>
    implements Auction
{
    @ForeignKey(() => RobotEntity)
    @Column({
        type: 'uuid',
    })
    robotId: string;

    @Column({
        type: DataType.DECIMAL(9, 2),
        defaultValue: 0,
    })
    startAmount: number;

    @Column({
        type: DataType.DECIMAL(9, 2),
        defaultValue: 0,
    })
    currentAmount: number;

    @Column({
        type: DataType.DECIMAL(9, 2),
        defaultValue: 0,
    })
    finalAmount: number;

    /* Associations */
    @BelongsTo(() => RobotEntity, 'robot_id')
    robot?: Robot;
}
