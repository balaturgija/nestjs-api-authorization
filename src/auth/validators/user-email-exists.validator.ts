import { Injectable } from '@nestjs/common';
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../../users/users.service';

@Injectable()
@ValidatorConstraint({ name: 'emailExists', async: true })
export class EmailExists implements ValidatorConstraintInterface {
    constructor(private readonly service: UsersService) {}

    async validate(email: string): Promise<boolean> {
        return !(await this.service.emailExists(email));
    }
    defaultMessage?(): string {
        return `User with value already exists.`;
    }
}
