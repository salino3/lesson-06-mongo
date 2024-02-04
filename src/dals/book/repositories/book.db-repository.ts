import { ObjectId } from "mongodb";
import { BookRepository } from "./book.repository.js";
import {bookContext} from '../book.context.js';
import { Book } from "../book.model.js";

export const dbRepository: BookRepository = {
  getBookList: async (page?: number, pageSize?: number) => {
    const skip = Boolean(page) ? (page - 1) * pageSize : 0;
    const limit = pageSize ?? 0;
    return await bookContext
    .find()
    .skip(skip)
    .limit(limit)
    .lean();
  },
  getBook: async (id: string) => {
    return await bookContext
    .findOne({
      _id: new ObjectId(id)
    })
  },
  saveBook: async (book: Book) => {
    // upsert
    const result = await bookContext
      .findOneAndUpdate(
        {
          _id: book._id,
        },
        {
          $set: book,
        },
        {
          upsert: true,
          returnDocument: 'after',
        }
      );
 const updatedBook = result || book;

 return updatedBook;
  },
  //

  deleteBook: async (id: string) => {
   const { deletedCount } = await bookContext.deleteOne({
     _id: new ObjectId(id),
   });
    return deletedCount === 1;
  },
};
