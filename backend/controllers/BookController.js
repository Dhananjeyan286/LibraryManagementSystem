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

const deleteBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (book) {
        await book.remove();
        res.json({ message: "Book removed" });
    } else {
        res.status(404);
        throw new Error("Book not found");
    }
});

const createBook = asyncHandler(async (req, res) => {
    const book = new Book({
        user: req.user._id,
        name: "Sample name",
        image: "/images/sample.jpg",
        description: "Sample description",
        author: "Sample author",
        genre: "Sample genre",
        ageCategory: "kids",
        publishedDate: new Date("2022-02-22"),
        noOfPages: 222,
        publicationName: "Sample publication",
        editionNumber: 2,
        finePerDay: "22",
        noOfReviews: 2,
        ratings: 2,
        floorNumber: 2,
        rackNumber: 22,
        rowNumber: 22,
        positionFromLeft: 2
    });

    const createdBook = await book.save();
    res.status(201).json(createdBook);
});

const updateBook = asyncHandler(async (req, res) => {
    const { name, image, description, author, genre, ageCategory, publishedDate, noOfPages, publicationName, editionNumber, finePerDay, noOfReviews, ratings, floorNumber, rackNumber, rowNumber, positionFromLeft } = req.body;

    const book = await Book.findById(req.params.id);

    if (book) {
        book.user = req.user._id
        book.name = name;
        book.image = image;
        book.description = description;
        book.author = author;
        book.genre = genre;
        book.ageCategory = ageCategory;
        book.publishedDate = publishedDate;
        book.noOfPages = noOfPages;
        book.publicationName = publicationName;
        book.editionNumber = editionNumber;
        book.finePerDay = finePerDay;
        book.noOfReviews = noOfReviews;
        book.ratings = ratings;
        book.floorNumber = floorNumber;
        book.rackNumber = rackNumber;
        book.rowNumber = rowNumber;
        book.positionFromLeft = positionFromLeft;

        const updatedBook = await book.save();
        res.json(updatedBook);
    } else {
        res.status(404);
        throw new Error("Book not found");
    }
});

export { getBooks, getBookById, deleteBook, createBook, updateBook };
