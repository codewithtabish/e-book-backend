import { v2 as cloudinary } from 'cloudinary';
import { config } from './config';

cloudinary.config({
  cloud_name: config.Cloud_Name,
  api_key: config.Api_key,
  api_secret: config.Api_Secret,
});

export default cloudinary;
