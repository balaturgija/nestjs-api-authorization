import { ApiProperty } from '@nestjs/swagger';

export class RoleDto implements Role {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    abrv: string;
}
