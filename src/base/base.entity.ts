import { Exclude } from 'class-transformer';
import { Column, Model } from 'sequelize-typescript';
import { v4 } from 'uuid';

export class BaseEntity<T> extends Model<T> {
    @Column({
        primaryKey: true,
        type: 'uuid',
        defaultValue: () => v4(),
    })
    id: string;

    @Exclude()
    createdAt: Date;

    @Exclude()
    updatedAt: Date;

    @Exclude()
    deletedAt: Date;
}
