import { config as con } from 'dotenv';
con();
const _config = {
  PORT: process.env.PORT,
  DBURL: process.env.DBURL,
  Envirment: process.env.ENVIRMENT,
  JWT_SECRET: process.env.JWT_SECRET,
};

export const config = Object.freeze(_config);
