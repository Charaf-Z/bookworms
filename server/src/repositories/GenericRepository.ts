import { Document, FilterQuery, Model } from "mongoose";
import { GenericRepositoryInterface } from "./GenericRepositoryInterface";

export class GenericRepository<T extends Document>
  implements GenericRepositoryInterface<T>
{
  constructor(private readonly model: Model<T>) {
    this.model = model;
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id).exec();
  }

  async findAll(): Promise<T[]> {
    return await this.model.find().exec();
  }

  async findOne(filter: Partial<T>): Promise<T | null> {
    try {
      const document = await this.model
        .findOne({ filter } as FilterQuery<T>)
        .exec();
      return document;
    } catch (err) {
      console.log("Error finding document: ", err);
      return null;
    }
  }

  async create(entity: T): Promise<T> {
    return await this.model.create(entity);
  }

  async update(
    id: string,
    newData: Partial<T>,
    userId?: string,
  ): Promise<T | null> {
    return await this.model
      .findByIdAndUpdate(id, newData, { new: true })
      .exec();
  }

  async delete(id: string, userId?: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
