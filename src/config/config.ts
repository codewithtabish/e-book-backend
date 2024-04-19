import { config as con } from 'dotenv';
con();
const _config = {
  PORT: process.env.PORT,
  DBURL: process.env.DBURL,
};

export const config = Object.freeze(_config);
