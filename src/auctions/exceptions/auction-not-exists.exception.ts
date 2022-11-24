import { HttpException } from '@nestjs/common';

export class AuctionNotExistsException extends HttpException {
    constructor(response: string | Record<string, any>) {
        super(response, 404);
    }
}
