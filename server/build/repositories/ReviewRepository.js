"use strict";
// import { Model } from "mongoose";
// import { Review } from "../models/Review";
// import { GenericRepository } from "./GenericRepository";
// import { UserRepository } from "./UserRepository";
//
// export class ReviewRepository extends GenericRepository<Review> {
//   constructor(
//     public reviewModle: Model<Review>,
//     private readonly user: UserRepository,
//   ) {
//     super(reviewModle);
//     this.user = user;
//   }
//
//   async canUpdateOrDeleteReview(
//     userId: string,
//     reviewId: string,
//   ): Promise<boolean> {
//     const isAdmin = await this.user.isAdmin(userId);
//     const review = await this.findById(reviewId);
//
//     return isAdmin || review?.userId.toString() === userId;
//   }
//
//   async update(
//     id: string,
//     newData: Partial<Review>,
//     userId: string,
//   ): Promise<Review | null> {
//     const canUpdate = await this.canUpdateOrDeleteReview(userId, id);
//     if (!canUpdate)
//       throw new Error("You don't have permission to update this review.");
//     return super.update(id, newData);
//   }
//
//   async delete(id: string, userId: string): Promise<Review | null> {
//     const canDelete = await this.canUpdateOrDeleteReview(userId, id);
//     if (!canDelete)
//       throw new Error("You don't have permission to delete this review.");
//     return super.delete(id);
//   }
// }
