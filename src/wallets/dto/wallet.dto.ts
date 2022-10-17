import { ApiProperty } from '@nestjs/swagger';

export class WalletDto implements Wallet {
    @ApiProperty()
    id: string;

    @ApiProperty()
    amount: number;
}
