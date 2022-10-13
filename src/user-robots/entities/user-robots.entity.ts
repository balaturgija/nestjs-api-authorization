import { BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript';
import { UserRobot } from '../../../types/user-robot';
import { BaseEntity } from '../../base/base.entity';
import { TableName } from '../../constants';
import { RobotEntity } from '../../robots/entities/robot.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Table({
    tableName: TableName.UserRobots,
    paranoid: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
})
export class UserRobotsEntity
    extends BaseEntity<UserRobotsEntity>
    implements UserRobot
{
    @ForeignKey(() => UserEntity)
    @Column({
        type: 'uuid',
    })
    userId: string;

    @ForeignKey(() => RobotEntity)
    @Column({
        type: 'uuid',
    })
    robotId: string;

    /* Associations */
    @BelongsTo(() => UserEntity, 'user_id')
    user: UserEntity;

    @BelongsTo(() => RobotEntity, 'robot_id')
    robot: RobotEntity;
}
