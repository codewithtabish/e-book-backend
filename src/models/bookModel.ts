import mongoose from 'mongoose';
import { BookSchemaTypes } from '../types/bookTypes';

const bookModel = new mongoose.Schema<BookSchemaTypes>(
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
