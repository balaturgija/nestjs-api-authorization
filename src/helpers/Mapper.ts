import { BatteryDto } from '../batteries/dto/battery.dto';
import { BatteryEntity } from '../batteries/entities/battery.entity';
import { RobotDto } from '../robots/dto/robot.dto';
import { RobotEntity } from '../robots/entities/robot.entity';
import { RoleDto } from '../roles/dto/role.dto';
import { RoleEntity } from '../roles/entities/role.entity';
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

export const toRobtDto = (data: RobotEntity): RobotDto => {
    const {
        id,
        name,
        startPrice,
        currentPrice,
        status,
        createorsSignature,
        batteryId,
    } = data;
    const robotDto: RobotDto = {
        id,
        name,
        startPrice,
        currentPrice,
        status,
        createorsSignature,
        batteryId,
    };
    return robotDto;
};

export const toUserDto = (data: UserEntity): UserDto => {
    const { id, username, email, password, walletId, roleId } = data;
    const userDto: UserDto = {
        id,
        username,
        email,
        password,
        roleId,
        walletId,
    };
    return userDto;
};

export const toRoleDto = (data: RoleEntity): RoleDto => {
    const { id, name, abrv } = data;
    const roleDto: RoleDto = {
        id,
        name,
        abrv,
    };
    return roleDto;
};

export const toUserRoleDto = (userData: UserEntity): User => {
    const userRole = {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        password: userData.password,
        roleId: userData.roleId,
        walletId: userData.walletId,
        role: {
            id: userData.role.id,
            name: userData.role.name,
            abrv: userData.role.abrv,
        },
    };

    return userRole;
};
