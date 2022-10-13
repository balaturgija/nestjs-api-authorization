import { BelongsTo, Column, ForeignKey } from 'sequelize-typescript';
import { BaseEntity } from '../../base/base.entity';
import { RobotEntity } from '../../robots/entities/robot.entity';

export class AuctionEntity
    extends BaseEntity<AuctionEntity>
    implements Auction
{
    @ForeignKey(() => RobotEntity)
    @Column({
        type: 'uuid',
    })
    robotId: string;

    /* Associations */
    @BelongsTo(() => RobotEntity, 'robot_id')
    robot?: Robot;
}
