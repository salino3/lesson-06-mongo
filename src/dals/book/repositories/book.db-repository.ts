import {db} from '#core/servers/index.js';
import { BookRepository } from "./book.repository.js";
import { Book } from "../book.model.js";

export const dbRepository: BookRepository = {
  getBookList: async (page?: number, pageSize?: number) => {
    return await db.collection<Book>("books").find().toArray();
  },
  getBook: async (id: string) => {
    throw new Error("Not implemented");
  },
  saveBook: async (book: Book) => {
   const {insertedId} = await db.collection<Book>("books").insertOne(book);
   return {
    ...book,
    _id: insertedId
   };
  },
  deleteBook: async (id: string) => {
    throw new Error("Not implemented");
  },
};
