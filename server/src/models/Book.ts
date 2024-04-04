import { Document, Schema, model } from "mongoose";

export interface Book extends Document {
  title: string;
  authors: string[];
}

const bookSchema = new Schema<Book>({
  title: { type: String, required: true },
  authors: [{ type: String, required: true }],
});

export const BookModel = model<Book>("book", bookSchema);
