import type { Knex } from 'knex';
import { resolve } from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: resolve(__dirname, '..', '..', '..', '.env'),
});

const config: { [key: string]: Knex.Config } = {
  development: {
    client: process.env.DATABASE_CLIENT,
    connection: {
      database: process.env.DATABASE_NAME,
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT) || 3306,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: resolve(__dirname, 'migrations'),
    },
  },

  production: {
    client: process.env.DATABASE_CLIENT,
    connection: {
      database: process.env.DATABASE_NAME,
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT) || 3306,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: resolve(__dirname, 'migrations'),
    },
  },
};

export default config;
