import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export class RequestValidationPipe implements PipeTransform {
    async transform(value: any, argumentMetadata: ArgumentMetadata) {
        // type: 'body' | 'query' | 'param' | 'custom';
        // metatype?: Type<unknown>;
        // data?: string;
        if (!this.hasValue(argumentMetadata)) return value;

        const object = await plainToInstance(argumentMetadata.metatype, value);
        const errors = this.buildErrors(await validate(object));
        console.log('\x1b[46m Executing Request Validation Pipe \x1b[0m');

        if (errors) {
            throw new BadRequestException({
                success: false,
                data: errors,
            });
        }

        return value;
    }

    private toValidate(metatype: any): boolean {
        return ![String, Boolean, Number, Object].includes(metatype);
    }

    private buildErrors(errors: ValidationError[]) {
        if (!Boolean(errors.length)) return;

        return errors.map((error) => {
            return {
                [error.property]: error.constraints,
            };
        });
    }

    private hasValue(argumentMetadata: ArgumentMetadata) {
        return argumentMetadata || this.toValidate(argumentMetadata.metatype);
    }
}
