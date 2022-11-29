import { ArgumentsHost, Catch, HttpException, Inject } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

@Catch(WsException, HttpException)
export class WsExceptionFilter extends BaseWsExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void {
        const properError = new WsException(exception.getResponse());
        // if (properError) throw new WsValidationException(properError);
        super.catch(properError, host);
    }
}
