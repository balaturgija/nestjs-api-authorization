import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Table,
} from 'sequelize-typescript';
import { AuctionEntity } from '../../auctions/entities/auction.entity';
import { BaseEntity } from '../../base/base.entity';
import { TableName } from '../../constants';
import { UserEntity } from '../../users/entities/user.entity';

@Table({
    tableName: TableName.Bids,
    paranoid: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
})
export class BidEntity extends BaseEntity<BidEntity> implements Bid {
    @Column({
        type: DataType.DECIMAL(9, 2),
    })
    offerPrice: number;

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

    @BelongsTo(() => UserEntity, 'user_id')
    user?: UserEntity;

    @BelongsTo(() => AuctionEntity, 'auction_id')
    auction?: AuctionEntity;
}
