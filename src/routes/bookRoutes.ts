import express from 'express';
import upload from '../middlewares/fileHandler';
import bookController from '../controller/bookController';
import { authenticate } from '../middlewares/authenicate';

const bookRouter = express.Router();

bookRouter
  .route('/create')
  .post(authenticate, upload, bookController.createBook);

bookRouter.route('/read/:id').get(authenticate, bookController.readBook);

bookRouter.route('/list').get(authenticate, bookController.bookList);

bookRouter.route('/delete/:id').delete(authenticate, bookController.deleteBook);

bookRouter
  .route('/update/:id')
  .patch(authenticate, upload, bookController.updateBook);

export default bookRouter;
