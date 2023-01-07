import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();
import Book from "../models/BookModel.js";

// /api/books

router.get(
    "/",
    asyncHandler(async (req, res) => {
        const books = await Book.find({});
        
        res.json(books);
    })
);


router.get(
    "/:id",
    asyncHandler(async (req, res) => {
        const book = await Book.findById(req.params.id);

        if (book) {
            res.json(book);
        } else {
            res.status(404);
            throw new Error("Book not found");
        }
    })
);

export default router;
