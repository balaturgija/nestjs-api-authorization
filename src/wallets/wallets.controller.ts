import { Controller } from '@nestjs/common';
import { WalletsService } from './wallets.service';

@Controller('wallets')
export class WalletsController {
    /**
     *
     */
    constructor(private readonly walletsService: WalletsService) {}
    async withdrawAsync() {
        return 'withdaw';
    }
    async depositAsync() {
        return 'deposit';
    }
}
