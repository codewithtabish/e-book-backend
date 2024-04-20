import { config as con } from 'dotenv';
con();
const _config = {
  PORT: process.env.PORT,
  DBURL: process.env.DBURL,
  Envirment: process.env.ENVIRMENT,
  JWT_SECRET: process.env.JWT_SECRET,
  Cloud_Name: process.env.Cloud_Name,
  Api_key: process.env.Api_key,
  Api_Secret: process.env.Api_Secret,
  Frontend_Domain: process.env.Frontend_Domain,
};

export const config = Object.freeze(_config);
