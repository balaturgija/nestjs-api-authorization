import { BatteryDto } from '../batteries/dto/battery.dto';
import { BatteryEntity } from '../batteries/entities/battery.entity';

export const toBatteryDto = (data: BatteryEntity): BatteryDto => {
    const { id, name } = data;
    const batteryDto: BatteryDto = {
        id,
        name,
    };
    return batteryDto;
};
