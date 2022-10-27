import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    Matches,
} from 'class-validator';
import { Role } from '../../constants';

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

    @ApiProperty({
        enum: [Role.Collector, Role.Engineer],
    })
    @IsEnum(Role)
    @IsNotEmpty()
    role: Role;
}
