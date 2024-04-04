"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = void 0;
var mongoose_1 = require("mongoose");
var bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    authors: [{ type: String, required: true }],
});
exports.BookModel = (0, mongoose_1.model)("book", bookSchema);
