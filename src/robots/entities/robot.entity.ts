import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import { TableName } from 'src/constants';
import { BatteryEntity } from 'src/batteries/entities/battery.entity';
import { BaseEntity } from 'src/base/base.entity';

interface Robot {
  id: string;
  name: string;
  batteryId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

@Table({
  tableName: TableName.Robots,
  paranoid: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
})
export class RobotEntity extends BaseEntity<RobotEntity> {
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
  @BelongsTo(() => BatteryEntity, 'batterId')
  battery: BatteryEntity;
}
