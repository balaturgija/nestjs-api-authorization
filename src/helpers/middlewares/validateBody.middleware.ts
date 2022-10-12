import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

class ErrorHandler {
    status: number;
    message: string;
    data: any;

    constructor(status: number, message: string, data: any) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}

function handleError(res: Response, err: ErrorHandler): Response {
    const { status, message, data } = err;
    return res.status(status).json({ message, data });
}

function mapErrors(errors: ValidationError[]): string[] {
    const errStrings: string[] = [];
    errors.forEach((err) => {
        if (err.children && err.children.length > 0) {
            errStrings.push(...mapErrors(err.children));
        } else {
            errStrings.push(...Object.values(err.constraints));
        }
    });

    return errStrings;
}

export function validateBody(bodyClass: any) {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        console.log('Execute validate body middleware');
        const mapped: any = plainToClass(bodyClass, req.body);
        const errors = await validate(mapped);
        if (errors && errors.length > 0) {
            const mappedErrors = mapErrors(errors);
            return handleError(
                res,
                new ErrorHandler(400, `Model validation failed`, mappedErrors)
            );
        } else {
            req.body = mapped;
            return next();
        }
    };
}
