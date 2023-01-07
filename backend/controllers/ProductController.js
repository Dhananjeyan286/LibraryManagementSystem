import asyncHandler from "express-async-handler";
import Book from "../models/BookModel.js";

const getBooks = asyncHandler(async (req, res) => {
    const Books = await Book.find({});

    res.json(Books);
});

const getBookById = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (book) {
        res.json(book);
    } else {
        res.status(404);
        throw new Error("Book not found");
    }
});

export { getBooks, getBookById };
