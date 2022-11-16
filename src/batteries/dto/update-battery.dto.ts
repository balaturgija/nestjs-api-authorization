import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBatteryDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}
