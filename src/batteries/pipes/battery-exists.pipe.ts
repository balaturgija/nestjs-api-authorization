import { Injectable, PipeTransform } from '@nestjs/common';
import { BatteriesService } from '../batteries.service';
import { UserCreateDto } from '../../users/dto/create-user.dto';
import { BatteryNotExistsException } from '../exceptions/battery-not-exists.exception';

@Injectable()
export class BatteryExistsPipe implements PipeTransform<UserCreateDto> {
    constructor(private readonly batteryService: BatteriesService) {}
    async transform(value: any) {
        const exists = await this.batteryService.exists(value);

        if (!exists) {
            throw new BatteryNotExistsException({
                message: `Battery with ID ${value} not found.`,
            });
        }

        return value;
    }
}
