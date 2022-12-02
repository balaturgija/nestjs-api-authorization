import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuctionUsersServices } from '../../auctions/services/auction-users.service';
import { UserAlreadyJoined } from '../exceptions/user-already-joined.exception';

@Injectable()
export class AuctionAuthGuard implements CanActivate {
    constructor(private readonly auctionTokensService: AuctionUsersServices) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const auctionId = request.params.id;
        const userId = request.user.id;
        const result =
            await this.auctionTokensService.existsByAuctionIdAndUserId(
                auctionId,
                userId
            );

        if (result) throw new UserAlreadyJoined();

        return true;
    }
}
