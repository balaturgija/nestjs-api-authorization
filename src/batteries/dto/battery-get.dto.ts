import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, IsUUID } from 'class-validator';

export class BatteryGetDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string;

  constructor({ name }: any = {}) {
    this.name = name;
  }
}
