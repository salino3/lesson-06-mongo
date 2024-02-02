import {ObjectId} from 'mongodb';

export interface Book {
  id: string;
  title: string;
  releaseDate: Date;
  author: string;
}
