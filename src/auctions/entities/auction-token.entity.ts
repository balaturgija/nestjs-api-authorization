import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Table,
} from 'sequelize-typescript';
import { BaseEntity } from '../../base/base.entity';
import { TableName } from '../../constants';
import { UserEntity } from '../../users/entities/user.entity';
import { AuctionEntity } from './auction.entity';

@Table({
    tableName: TableName.AuctionTokens,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
})
export class AuctionTokenEntity extends BaseEntity<AuctionTokenEntity> {
    @Column({
        type: DataType.TEXT,
    })
    token: string;

    @ForeignKey(() => UserEntity)
    @Column({
        type: 'uuid',
    })
    userId: string;

    @ForeignKey(() => AuctionEntity)
    @Column({
        type: 'uuid',
    })
    auctionId: string;

    /* Associations */
    @BelongsTo(() => UserEntity, 'user_id')
    user?: UserEntity;

    @BelongsTo(() => AuctionEntity, 'auction_id')
    auction?: AuctionEntity;
}
