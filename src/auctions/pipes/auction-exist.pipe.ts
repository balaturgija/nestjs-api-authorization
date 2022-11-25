import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { AuctionsService } from '../services/auctions.service';
import { AuctionNotExistsException } from '../exceptions/auction-not-exists.exception';

@Injectable()
export class AuctionExistsPipe implements PipeTransform<CreateUserDto> {
    constructor(private readonly auctionsService: AuctionsService) {}
    async transform(value: any) {
        const exists = await this.auctionsService.exists(value);

        if (!exists) {
            throw new AuctionNotExistsException({
                message: `Auction with ID ${value} not found`,
            });
        }

        return value;
    }
}
