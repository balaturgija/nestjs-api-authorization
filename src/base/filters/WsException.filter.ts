import { ArgumentsHost, Catch, HttpException, Inject } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { isObject } from 'lodash';

@Catch(WsException, HttpException)
export class WsExceptionFilter implements BaseWsExceptionFilter {
    constructor(@Inject('SERIALIZER') private readonly serializer: any) {}
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToWs();
        const client = ctx.getClient();
        const response = exception.getResponse();
        if (!('getResponse' in exception)) {
            response.status(500).json(
                this.serializer.serializeError({
                    message: 'Something went wrong',
                })
            );

            return;
        }

        const validationError = this.serializer.serializeError({
            message: 'There are some validation errors.',
            meta: exception.getResponse(),
        });
        if (validationError.errors.length > 0) {
            this.handleValidationError(client, validationError);
        } else {
            this.handleError(client, exception);
        }
    }

    private handleValidationError<TClient extends { emit: Function }>(
        client: TClient,
        error: any
    ) {
        client.emit('exception', error);
    }

    handleError<TClient extends { emit: Function }>(
        client: TClient,
        exception: any
    ): void {
        if (!(exception instanceof WsException)) {
            return this.handleUnknownError(exception, client);
        }

        const status = 'error';
        const result = exception.getError();
        const message = isObject(result) ? result : { status, message: result };
        client.emit('exception', message);
    }

    handleUnknownError<TClient extends { emit: Function }>(
        exception: any,
        client: TClient
    ): void {
        const status = 'error';
        client.emit('exception', { status, message: 'Unknown exception' });

        if (this.isExceptionObject(exception)) {
            return this.serializer.serializeError({
                message: exception.message,
                stack: exception.stack,
            });
        }
    }

    isExceptionObject(err: any): err is Error {
        return isObject(err) && !!(err as Error).message;
    }
}
