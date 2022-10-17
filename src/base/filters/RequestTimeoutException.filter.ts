import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    RequestTimeoutException,
} from '@nestjs/common';
import { ResponseBuilder } from '../utils/ResponseDataBuilder.util';

@Catch(RequestTimeoutException)
export class RequesttimeoutExceptionFiler implements ExceptionFilter {
    catch(exception: RequestTimeoutException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();

        const path = `${request.protocol}://${request.hostname}${request.path}`;
        const status = exception.getStatus();

        console.log('Global exception filter');

        response
            .status(status)
            .send(
                ResponseBuilder.build(
                    status,
                    request.method,
                    'error',
                    'Request timed out',
                    path
                )
            );
    }
}
