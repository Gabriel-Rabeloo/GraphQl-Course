import knexFn from 'knex';
import knexFile from './knexfile';

export const knex = knexFn(knexFile[process.env.NODE_ENV || 'development']);
