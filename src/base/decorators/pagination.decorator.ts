import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function Pagination() {
    return applyDecorators(
        ApiQuery({
            name: 'page',
            type: 'number',
            required: false,
            description: 'Default 1',
        }),
        ApiQuery({
            name: 'size',
            type: 'number',
            required: false,
            description: 'Default 10',
        }),
        ApiQuery({
            name: 'direction',
            type: 'string',
            required: false,
            description: 'asc | desc',
        })
    );
}
