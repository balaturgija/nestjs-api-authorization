import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsUUID,
    Matches,
} from 'class-validator';

export class UserCreateDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsEmail(undefined, { each: true })
    @Matches(/\S+@\S+\.\S+/, { message: 'Email is not in valid format.' })
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiHideProperty()
    @Exclude()
    walletId: string;

    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    roleId: string;
}
