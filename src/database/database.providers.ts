import * as dotenv from 'dotenv';
import * as path from 'path';
import { Sequelize } from 'sequelize-typescript';
import { BatteryEntity } from '../batteries/entities/battery.entity';
import { Provider } from '../constants';
import { RobotEntity } from '../robots/entities/robot.entity';

dotenv.config({
  path: path.resolve(`.env`),
});

export const database = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [BatteryEntity, RobotEntity],
  define: {
    underscored: true,
    paranoid: true,
  },
});

export const databaseProviders = [
  {
    provide: Provider.Sequelize,
    useFactory: async () => {
      return database;
    },
  },
];
