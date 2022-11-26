import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { AuctionsService } from '../services/auctions.service';
import { AuctionNotExistsException } from '../exceptions/auction-not-exists.exception';
import { AuctionAlreadyExistsException } from '../exceptions/auction-already-exists.exception';

@Injectable()
export class AuctionExistsPipe implements PipeTransform<CreateUserDto> {
    constructor(private readonly auctionsService: AuctionsService) {}
    async transform(value: any, metadata: ArgumentMetadata) {
        if (metadata.data === 'robotId') {
            const exists = await this.auctionsService.existByRobotId(value);

            if (!exists) {
                throw new AuctionAlreadyExistsException({
                    message: `Robot is already on auction with id: ${exists.id}.`,
                });
            }
        }

        if (metadata.data === 'id') {
            const exists = await this.auctionsService.existsById(value);

            if (!exists) {
                throw new AuctionNotExistsException({
                    message: `Auction with ID ${value} not found`,
                });
            }
        }

        return value;
    }
}
