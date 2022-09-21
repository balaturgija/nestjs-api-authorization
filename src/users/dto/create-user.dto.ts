import { ApiProperty } from '@nestjs/swagger';
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

    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    roleId: string;
}
