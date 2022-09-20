import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { SortDirection } from 'src/helpers/Sorter';

export class BatteryFilterDto {
    @ApiPropertyOptional()
    @Transform(({ value }) => (value ? Number(value) : value))
    @IsOptional()
    @IsInt()
    @Min(1, { message: "page can't be less than 1" })
    page: number;

    @ApiPropertyOptional()
    @Transform(({ value }) => (value ? Number(value) : value))
    @IsOptional()
    @IsInt()
    @Min(1, { message: "rpp can't be less than 1" })
    rpp: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    sortBy: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(SortDirection)
    sortDirection: SortDirection;
}
