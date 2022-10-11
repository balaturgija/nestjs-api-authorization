import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export class BaseController {
    Ok = (res: Response, data?: any): Response => {
        return res.status(HttpStatus.OK).json(data);
    };

    Created = (res: Response, data?: any): Response => {
        return res.status(HttpStatus.CREATED).json(data);
    };

    BadRequest = (res: Response, message?: string) => {
        return res.status(HttpStatus.BAD_REQUEST).json({
            message: message || 'The server could not understand the request',
        });
    };

    Unauthorized = (res: Response, message?: string): Response => {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            message: message || 'User is not authorized for this action.',
        });
    };

    Forbidden = (res: Response, message?: string): Response => {
        return res.status(HttpStatus.FORBIDDEN).json({
            message: message || 'User is not permitted for this action.',
        });
    };

    NotFound = (res: Response, message?: string): Response => {
        return res
            .status(HttpStatus.NOT_FOUND)
            .json({ message: message || 'Resource not found.' });
    };

    Conflict = (res: Response, message?: string): Response => {
        return res.status(HttpStatus.CONFLICT).json({
            message:
                message || 'Request could not be completed due to a conflict.',
        });
    };

    Error = (res: Response, message?: string[]): Response => {
        return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: message || 'Server error.' });
    };
}
