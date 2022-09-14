import { ApiProperty } from '@nestjs/swagger';

export class BatteryCreateDto {
  @ApiProperty()
  name: string;
}
