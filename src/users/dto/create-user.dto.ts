import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    Matches,
    Validate,
} from 'class-validator';
import { EmailExists } from '../../auth/validators/user-email-exists.validator';
import { Role } from '../../constants';

export class CreateUserDto {
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

    @ApiProperty({ enum: Role })
    @IsString()
    @IsEnum(Role)
    role: Role;
}
