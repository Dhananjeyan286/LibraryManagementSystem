import asyncHandler from "express-async-handler";
import Book from "../models/BookModel.js";

const getBooks = asyncHandler(async (req, res) => {

    const searchObj = {}

    if(req.query.name && req.query.name !== "*") {
        searchObj["name"] = {
            $regex: req.query.name,
            $options: "i",
        };
    }

    if (req.query.author && req.query.author !== "*") {
        searchObj["author"] = {
            $regex: req.query.author,
            $options: "i",
        };
    }
    
    if (req.query.genre && req.query.genre !== "*") {
        searchObj["genre"] = {
            $regex: req.query.genre,
            $options: "i",
        };
    }

    if (req.query.ageCategory && req.query.ageCategory !== "*") {
        searchObj["ageCategory"] = {
            $regex: req.query.ageCategory,
            $options: "i",
        };
    }

    if (req.query.publicationName && req.query.publicationName !== "*") {
        searchObj["publicationName"] = {
            $regex: req.query.publicationName,
            $options: "i",
        };
    }

    if (req.query.ratings && req.query.ratings !== "*") {
        searchObj["ratings"] = {
            $gt: Number(req.query.ratings),
        };
    }

    if (req.query.noOfReviews && req.query.noOfReviews !== "*") {
        searchObj["noOfReviews"] = {
            $gt: Number(req.query.noOfReviews),
        };
    }

    const pageSize = 2;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Book.countDocuments(searchObj);

    const Books = await Book.find(searchObj)
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json({ Books, page, pages: Math.ceil(count / pageSize) });
});

const getBookById = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id).populate("reviews.user");

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

const createBookReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const book = await Book.findById(req.params.id);

    if (book) {
        const alreadyReviewed = book.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            res.status(400);
            throw new Error("Book already reviewed");
        }

        const review = {
            rating: Number(rating),
            comment: comment,
            user: req.user._id,
        };

        book.reviews.push(review);

        book.noOfReviews = book.reviews.length;

        book.ratings =
            book.reviews.reduce((acc, item) => item.rating + acc, 0) /
            book.reviews.length;

        await book.save();
        res.status(201).json({ message: "Review added" });
    } else {
        res.status(404);
        throw new Error("Book not found");
    }
});

const getTopBooks = asyncHandler(async (req, res) => {
    const books = await Book.find({}).sort({ ratings: -1 }).limit(3);

    res.json(books);
});

export { getBooks, getBookById, deleteBook, createBook, updateBook, createBookReview, getTopBooks };
