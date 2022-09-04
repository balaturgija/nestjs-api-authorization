import { Exclude } from 'class-transformer';
import { Column, Model } from 'sequelize-typescript';
import { uuidv4 } from 'uuid';

export class BaseEntity<T> extends Model<T> {
  @Column({
    primaryKey: true,
    type: 'uuid',
    defaultValue: () => uuidv4(),
  })
  id: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  deletedAt: Date;
}
