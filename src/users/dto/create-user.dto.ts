import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsUUID,
    Matches,
    Validate,
} from 'class-validator';
import { EmailExists } from '../../auth/validators/user-email-exists.validator';

export class UserCreateDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsEmail(undefined, { each: true })
    @Matches(/\S+@\S+\.\S+/, { message: 'Email is not in valid format.' })
    @Validate(EmailExists)
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
