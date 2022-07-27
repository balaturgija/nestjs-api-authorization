import * as dotenv from 'dotenv';
import * as path from 'path';
import { Sequelize } from 'sequelize-typescript';
import { Provider } from '../constants';

dotenv.config({
  path: path.resolve('.env'),
});

export const databaseProviders = [
  {
    provide: Provider.Sequelize,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      //   await sequelize.sync({ force: true});

      return sequelize;
    },
  },
];
