import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseBuilder } from '../utils/ResponseDataBuilder.util';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const path = `${request.protocol}://${request.hostname}${request.path}`;
        const status = exception.getStatus();

        response
            .status(status)
            .send(
                ResponseBuilder.build(
                    status,
                    request.method,
                    'error',
                    exception.message,
                    path,
                    exception.getResponse()
                )
            );
    }
}
