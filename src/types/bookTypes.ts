import { UserSchemaTypes } from './userTypes';

interface BookSchemaTypes {
  _id: string;
  title: string;
  author: UserSchemaTypes;
  genre: string;
  file: string;
  coverImage: string;
}

export { BookSchemaTypes };
