import { Sequelize } from 'sequelize-typescript';
import { BatteryEntity } from '../batteries/entities/battery.entity';
import { Provider } from '../constants';
import { RobotEntity } from '../robots/entities/robot.entity';
import { RoleEntity } from '../roles/entities/role.entity';
import { UserEntity } from '../users/entities/user.entity';

export const databaseProviders = [
    {
        provide: Provider.Sequelize,
        useFactory: async () => {
            return new Sequelize({
                dialect: 'postgres',
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                models: [BatteryEntity, RobotEntity, UserEntity, RoleEntity],
                define: {
                    underscored: true,
                    paranoid: true,
                },
            });
        },
    },
];
