"use strict";
// import { Request, Response } from "express";
// import { controller, get } from "../decorators";
// import { BookRepository } from "../repositories";
//
// @controller("/api/v1/book")
// class BookController {
//   constructor(private bookRepository: BookRepository) {}
//
//   @get("/")
//   async getAllBooks(req: Request, res: Response): Promise<void> {
//     try {
//       const books = await this.bookRepository.findAll();
//       res.status(200).json(books);
//     } catch (err) {
//       res.status(500).json({ message: "Internel server error" });
//     }
//   }
//
//   @get("/:id")
//   async getBook(req: Request, res: Response): Promise<void> {
//     try {
//       const book = await this.bookRepository.findById(req.params.id);
//       res.status(200).json(book);
//     } catch (err) {
//       res.status(500).json({ message: "Internel server error" });
//     }
//   }
// }
