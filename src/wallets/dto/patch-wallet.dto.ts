import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class WalletPatchDto implements WalletPatch {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    // @IsDecimal()
    @Min(1.0)
    amount: number;
}
