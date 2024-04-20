import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import cloudinary from '../config/cloudinary';
import path from 'node:path';
import BookModel from '../models/bookModel';
import fs from 'node:fs';
import UserModel from '../models/userModel';

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { author, title, genre } = req.body;
    console.log(author, title, genre);
    const files = req.files as { [fieldName: string]: Express.Multer.File[] };
    const coverImageMimeType = files.coverImage[0].mimetype.split('/').at(-1);
    const fileMimeType = files.file[0].mimetype.split('/').at(-1);
    const fileName = files.coverImage[0].filename;
    const bookFileName = files.file[0].filename;
    let coverImageResult: any = undefined;
    let bookCloudResult: any = undefined;
    let book: any = undefined;
    let lastResponse: any = undefined;

    const coverImagefilePath = path.resolve(
      __dirname,
      `../../public/data/uploads/${fileName}`,
    );
    const bookfilePath = path.resolve(
      __dirname,
      `../../public/data/uploads/${bookFileName}`,
    );

    if (!author || !title || !genre || !coverImagefilePath || !bookfilePath) {
      return next(createHttpError(400, 'Please provide all fields'));
    }
    try {
      coverImageResult = await cloudinary.uploader.upload(coverImagefilePath, {
        filename_override: fileName,
        folder: 'books-cover',
        format: coverImageMimeType,
      });
      bookCloudResult = await cloudinary.uploader.upload(bookfilePath, {
        resource_type: 'raw',
        filename_override: bookFileName,
        folder: 'books',
        format: fileMimeType,
      });
    } catch (error) {
      if (error) {
        fs.promises.unlink(coverImagefilePath);
        fs.promises.unlink(bookfilePath);
        return next(createHttpError(500, error));
      }
    }

    const coverImageURL = coverImageResult.secure_url;
    const bookCloudURL = bookCloudResult.secure_url;
    console.log('here is ', (req as any).user.id);

    try {
      book = await new BookModel({
        title: title,
        author: (req as any).user.id as string,
        genre: genre,
        file: bookCloudURL,
        coverImage: coverImageURL,
      });
      lastResponse = await book.save();
    } catch (error) {
      if (error) {
        fs.promises.unlink(coverImagefilePath);
        fs.promises.unlink(bookfilePath);
        return next(createHttpError(500, error));
      }
    }
    console.log(lastResponse._id);
    if (lastResponse._id) {
      fs.promises.unlink(coverImagefilePath);
      fs.promises.unlink(bookfilePath);
    }
    // remove the files from the dicectory
    const user = await UserModel.findById((req as any).user.id);
    if (!user) {
      return next(createHttpError(404, 'User not found'));
    }
    user.books.push(lastResponse._id);
    await user.save();

    return res.status(201).json({
      message: 'Book created successfully',
      book: lastResponse,
    });

    // const file = req.files[0].fieldName; // Access the file uploaded with the fieldname 'file'
    // const coverImage = req.files.coverImage[0]; // Access the file uploaded with the fieldname 'coverImage'
  } catch (error: any) {
    return next(createHttpError(500, error));
  }
};

const readBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await BookModel.findById(req.params.id).populate('author');
    if (!book) {
      return next(createHttpError(404, 'Book not found'));
    }
    return res.status(200).json({ book, status: true });
  } catch (error: any) {
    return next(createHttpError(500, error));
  }
};

const bookList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await BookModel.find().populate('author');
    return res.status(200).json({ books, status: true, size: books.length });
  } catch (error: any) {
    return next(createHttpError(500, error));
  }
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await BookModel.findById(req.params.id);
    if (!book) {
      return next(createHttpError(404, 'Book not found'));
    }
    if ((book.author as any)._id.toString() !== (req as any).user.id) {
      return next(createHttpError(403, 'Authorization failed'));
    }

    // fs.promises.unlink(book.coverImage);
    // fs.promises.unlink(book.file);

    const coverImageSplit = book.coverImage.split('/')?.pop()?.split('.')[0];
    const last = `books-cover/${coverImageSplit}`;
    const deletedImage = await cloudinary.uploader.destroy(last as string);
    console.log(deletedImage);
    const fileSplit = book.file.split('/')?.pop();
    console.log('fileSplit', fileSplit);
    const lastFile = `books/${fileSplit}`;
    const deletedFile = await cloudinary.uploader.destroy(lastFile as string, {
      resource_type: 'raw',
    });
    const deletedBook = await BookModel.findByIdAndDelete(req.params.id);
    // cloudinary.uploader.destroy(book._id.toString());
    return res
      .status(200)
      .json({ message: 'Book deleted successfully', deleteBook: deletedBook });
  } catch (error: any) {
    return next(createHttpError(500, error));
  }
};

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, genre } = req.body;
    const book = await BookModel.findById(req.params.id);
    if (!book) {
      return next(createHttpError(404, 'Book not found'));
    }
    if ((book.author as any)._id.toString() !== (req as any).user.id) {
      return next(createHttpError(403, 'Authorization failed'));
    }
    const updateBook = await BookModel.findByIdAndUpdate(
      req.params.id,
      {
        title: title,
        genre: genre,
      },
      { new: true },
    );

    return res.status(200).json({
      book: updateBook,
      status: true,
      message: 'Book updated successfully',
    });
  } catch (error: any) {
    return next(createHttpError(500, error));
  }
};

export default {
  createBook,
  readBook,
  bookList,
  deleteBook,
  updateBook,
};
