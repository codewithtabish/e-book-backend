import mongoose from 'mongoose';
import { BookSchemaTypes } from '../types/bookTypes';

const BookSchema = new mongoose.Schema<BookSchemaTypes>(
  {
    title: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const BookModel = mongoose.model<BookSchemaTypes>('Book', BookSchema);

export default BookModel;
