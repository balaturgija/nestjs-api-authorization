import { config } from 'dotenv';
import { resolve } from 'path';

config({
  path: resolve('.env'),
});

export const development = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'postgres',
};
