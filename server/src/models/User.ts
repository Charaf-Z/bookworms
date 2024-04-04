import { Document, Schema, model } from "mongoose";

export interface User extends Document {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

const userSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, enum: ["admin", "writer"], default: "writer" },
});

export const UserModel = model<User>("User", userSchema);
