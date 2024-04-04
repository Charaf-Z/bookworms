"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModel = void 0;
var mongoose_1 = require("mongoose");
var reviewSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    bookId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Book", required: true },
    rating: { type: Number, required: true },
    reviewText: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
exports.ReviewModel = (0, mongoose_1.model)("Review", reviewSchema);
