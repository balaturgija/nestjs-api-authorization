import { BatteryDto } from '../batteries/dto/battery.dto';
import { BatteryEntity } from '../batteries/entities/battery.entity';
import { UserDto } from '../users/dto/user.dto';
import { UserEntity } from '../users/entities/user.entity';

export const toBatteryDto = (data: BatteryEntity): BatteryDto => {
    const { id, name } = data;
    const batteryDto: BatteryDto = {
        id,
        name,
    };
    return batteryDto;
};

export const toUserDto = (data: UserEntity): UserDto => {
    const { id, username, email, password, roleId } = data;
    const userDto: UserDto = {
        id,
        username,
        email,
        password,
        roleId,
    };
    return userDto;
};
