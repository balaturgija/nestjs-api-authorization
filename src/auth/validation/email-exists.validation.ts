import { Injectable } from '@nestjs/common';
import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { AuthRepository } from '../repository/auth.repository';

@Injectable()
@ValidatorConstraint({ name: 'emailExists', async: true })
export class EmailExists implements ValidatorConstraintInterface {
    /**
     *
     */
    constructor(private readonly authRepository: AuthRepository) {}
    async validate(
        email: string,
        args?: ValidationArguments
    ): Promise<boolean> {
        return !(await this.authRepository.emailExists(email));
    }

    defaultMessage(): string {
        throw 'User with email $value alread exists';
    }
}
