import {
    createParamDecorator,
    ExecutionContext,
    HttpStatus,
} from '@nestjs/common';
import { ResponseBuilder } from '../utils/ResponseDataBuilder.util';

interface ResponseData {
    status: HttpStatus;
    type: 'resource' | 'collection' | 'error';
    message: string;
}

export const ResponseDataBuilder = createParamDecorator(
    (data: ResponseData, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const response = ctx.switchToHttp().getResponse();

        response.status(data.status);
        console.log('Response Data builder ');

        return ResponseBuilder.build(
            data.status,
            request.method,
            data.type,
            data.message,
            `${request.protocol}://${request.hostname}${request.path}`,
            null
        );
    }
);
