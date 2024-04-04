import { Model } from "mongoose";
import { User, UserModel } from "../models";
import { GenericRepository } from "./GenericRepository";

class UserRepository extends GenericRepository<User> {
  constructor(userModel: Model<User>) {
    super(userModel);
  }
  async isAdmin(userId: string): Promise<boolean> {
    const user = await this.findById(userId);
    return user?.role === "admin";
  }

  // static async findById(id: string): Promise<User | null> {
  //   return await UserModel.findById(id).exec();
  // }
  //
  // static async findAll(): Promise<User[]> {
  //   return await UserModel.find().exec();
  // }
  //
  // static async findOne(filter: Partial<User>): Promise<User | null> {
  //   try {
  //     const document = await UserModel.findOne({ filter }).exec();
  //     return document;
  //   } catch (err) {
  //     console.log("Error finding document: ", err);
  //     return null;
  //   }
  // }
  //
  // static async create(entity: User): Promise<User> {
  //   return await UserModel.create(entity);
  // }
  //
  // static async update(
  //   id: string,
  //   newData: Partial<User>,
  // ): Promise<User | null> {
  //   return await UserModel.findByIdAndUpdate(id, newData, { new: true }).exec();
  // }
  //
  // static async delete(id: string): Promise<User | null> {
  //   return await UserModel.findByIdAndDelete(id).exec();
  // }
}

export const userRepository = new UserRepository(UserModel);
