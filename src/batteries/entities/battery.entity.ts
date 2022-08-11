import { Exclude } from 'class-transformer';
import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { TableName } from 'src/constants';
import { RobotEntity } from 'src/robots/entities/robot.entity';
import { v4 as uuidv4 } from 'uuid';

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
export class BatteryEntity extends Model<BatteryEntity> implements Battery {
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

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  deletedAt: Date;

  /* Associations */
  @BelongsTo(() => RobotEntity)
  battery: RobotEntity;
}
