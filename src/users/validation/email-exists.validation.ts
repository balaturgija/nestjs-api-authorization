import { Injectable } from '@nestjs/common';
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from '../respository/user.repository';

@Injectable()
@ValidatorConstraint({ name: 'emailExists', async: true })
export class EmailExists implements ValidatorConstraintInterface {
    /**
     *
     */
    constructor(private readonly userRepository: UserRepository) {}
    async validate(email: string): Promise<boolean> {
        return !(await this.userRepository.emailExists(email));
    }

    defaultMessage(): string {
        throw 'User with email $value alread exists';
    }
}
