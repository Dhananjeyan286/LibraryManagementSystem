import mongoose from "mongoose";

const requestSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        book: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Book",
        },
        isBooked: {
            type: Boolean,
            required: true,
            default: false,
        },
        bookedAt: {
            type: Date,
        },
        isBorrowed: {
            type: Boolean,
            required: true,
            default: false,
        },
        borrowedAt: {
            type: Date,
        },
        isReturned: {
            type: Boolean,
            required: true,
            default: false,
        },
        returnedAt: {
            type: Date,
        },
        isBookScannedForBorrowing: {
            type: Boolean,
            required: true,
            default: false,
        },
        isBookScannedForReturning: {
            type: Boolean,
            required: true,
            default: false,
        },
        isFinePaid: {
            type: Boolean,
            required: true,
            default: false,
        },
        fineAmnt: {
            type: Number,
            required: true,
            default: 0,
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        paymentResult: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Request = mongoose.model("Request", requestSchema);

export default Request;
