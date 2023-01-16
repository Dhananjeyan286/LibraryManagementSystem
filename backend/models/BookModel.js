import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
    {
        user: {//user who gave the review
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        rating: {
            type: Number, 
            required: true
        },
        comment: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

const bookSchema = mongoose.Schema(
    {
        user: {//user who created the book
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        genre: {
            type: String,
            required: true,
        },
        ageCategory: {
            type: String,
            enum: ["kids", "teen", "middle aged", "old aged", "all"], //0-12 kids, 13-22 teen, 23-45 middle aged, above 45 old aged
            required: true,
        },
        publishedDate: {
            type: Date,
            required: true,
        },
        noOfPages: {
            type: Number,
            required: true,
        },
        publicationName: {
            type: String,
            required: true,
        },
        editionNumber: {
            type: Number,
            required: true,
        },
        finePerDay: {
            type: Number,
            required: true,
        },
        noOfReviews: {
            type: Number,
            required: true,
            default: 0,
        },
        ratings: {// 0-5 nly whole numbers and .5 is allowed
            type: Number,
            required: true,
            default: 0,
        },
        reviews: [reviewSchema],
        floorNumber: {
            type: Number,
            required: true,
        },
        rackNumber: {
            type: Number,
            required: true,
        },
        rowNumber: {
            type: Number,
            required: true,
        },
        positionFromLeft: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
