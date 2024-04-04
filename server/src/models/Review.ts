import { Document, Schema, model } from "mongoose";

export interface Review extends Document {
  userId: Schema.Types.ObjectId;
  bookId: Schema.Types.ObjectId;
  rating: number;
  reviewText: string;
  genres: string[];
  created_at: Date;
  updated_at: Date;
}

const reviewSchema = new Schema<Review>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  rating: { type: Number, required: true },
  reviewText: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const ReviewModel = model<Review>("Review", reviewSchema);
