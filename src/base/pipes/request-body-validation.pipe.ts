import {
    ArgumentMetadata,
    Injectable,
    PipeTransform,
    Type,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { HttpValidationException } from '../exceptions/http-validation.exception';

@Injectable()
export class RequestBodyValidatePipe implements PipeTransform<any> {
    transform(value: any, metadata: ArgumentMetadata) {
        if (metadata.type !== 'body') {
            return value;
        }
        return this.validationHandle(value, metadata.metatype);
    }

    private async validationHandle(value: any, metatype: Type<any>) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const object = plainToClass(metatype, value);
        const errors = this.buildErrors(await validate(object));
        console.log('\x1b[46m Executing Request Validation Pipe \x1b[0m');

        if (errors) throw new HttpValidationException(errors);

        return value;
    }

    private toValidate(metatype: any): boolean {
        return ![String, Boolean, Number, Array, Object].includes(metatype);
    }

    private buildErrors(errors: ValidationError[]) {
        if (!Boolean(errors.length)) return;

        return errors.map((error) => {
            console.log(errors);
            return {
                [error.property]: error.constraints,
            };
        });
    }
}
