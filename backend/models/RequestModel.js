import mongoose from "mongoose";

const requestSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Book",
        },
        isBooked: {
            type: Boolean,
            default: false,
        },
        bookedAt: {
            type: Date,
        },
        isBorrowed: {
            type: Boolean,
            default: false,
        },
        borrowedAt: {
            type: Date,
        },
        isReturned: {
            type: Boolean,
            default: false,
        },
        returnedAt: {
            type: Date,
        },
        isCancelled: {
            type: Boolean,
            default: false,
        },
        cancelledAt: {
            type: Date,
        },
        isClosed: {
            type: Boolean,
            default: false,
        },
        closedAt: {
            type: Date,
        },
        isBookScanned: {
            type: Boolean,
            default: false,
        },
        isUserScanned: {
            type: Boolean,
            default: false,
        },
        usersRaisingRequest: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ],
        fineAmount: {
            type: Number,
            default: 0
        },
        returnedOnOrBefore: {
            type: Date
        }
    },
    {
        timestamps: true,
    }
);

const Request = mongoose.model("Request", requestSchema);

export default Request;
