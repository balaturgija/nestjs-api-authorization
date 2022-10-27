import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    Inject,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
    constructor(@Inject('SERIALIZER') private readonly serializer: any) {}

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        if (!('getResponse' in exception)) {
            response.status(500).json(
                this.serializer.serializeError({
                    message: 'Something went wrong',
                })
            );

            return;
        }

        response.status(exception.getStatus()).json(
            this.serializer.serializeError({
                message: 'There are some validation errors.',
                meta: exception.getResponse(),
            })
        );
    }
}
