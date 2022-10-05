import { ApiProperty } from '@nestjs/swagger';

export class UserDto implements User {
    @ApiProperty()
    id: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    roleId: string;
}
