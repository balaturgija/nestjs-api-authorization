import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { TableName } from 'src/constants';
import { Exclude } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { BatteryEntity } from 'src/batteries/entities/battery.entity';

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
export class RobotEntity extends Model<RobotEntity> implements Robot {
  @Column({
    primaryKey: true,
    type: 'uuid',
    defaultValue: () => uuidv4(),
  })
  id: string;

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

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  deletedAt: Date;

  /* Associations */
  @BelongsTo(() => BatteryEntity, 'batterId')
  battery: BatteryEntity;
}
