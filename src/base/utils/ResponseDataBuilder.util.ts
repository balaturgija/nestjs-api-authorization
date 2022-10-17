import { HttpStatus } from '@nestjs/common';

export class ResponseBuilder {
    static build<T>(
        status: HttpStatus,
        method: string,
        type: Type,
        message: string,
        path: string,
        data: T = null
    ): ResponseData<T> {
        return {
            status: status,
            method: method,
            type: type,
            message: message,
            path: path,
            data: data,
        };
    }
}
