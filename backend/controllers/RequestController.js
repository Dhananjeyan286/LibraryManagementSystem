import asyncHandler from "express-async-handler";
import Request from "../models/RequestModel.js";
import Book from "../models/BookModel.js";
import User from "../models/UserModel.js";
import sendEmail from "../utils/SendEmail.js"
import SendSms from "../utils/SendSms.js"

var borrowingLimitDays = 1;
var maximumBookingTime = 1440; // 24 hours
var maximumFineAmount = 500

var add_minutes = function (dt, minutes) {
    return new Date(dt.getTime() + minutes * 60000);
};

var subtract_days = function(date1, date2) {
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Math.round(
        Difference_In_Time / (1000 * 3600 * 24)
    );
    return Difference_In_Days
}

var add_days = function (date1, days) {
    return new Date(date1.getTime() + (1000 * 3600 * 24 * days));
};

var convertDateToString = function (dt) {
    let date = dt.toDateString()
    date = date.substring(4, date.length)
    let time = dt.toLocaleTimeString()
    return `${date} at ${time}`;
}

export const processCardID = asyncHandler(async (req, res) => {
    let cardId = req.query.CardID
    let user = await User.findOne({"rfid" : cardId}).select("-password")
    if(user) {
        // res.send("user")
        // return
        let requestRaised = await Request.findOne({
            userId: user._id,
            isBooked: true,
            isBorrowed: false,
            isReturned: false,
            isCancelled: false,
            isClosed: false,
            isBookScanned: true,
            isUserScanned: false
        }).populate("userId").populate("bookId");

        if(requestRaised) {
            requestRaised.isUserScanned = true
            requestRaised.isBorrowed = true
            requestRaised.borrowedAt = new Date()
            requestRaised.returnedOnOrBefore = add_days(requestRaised.borrowedAt, borrowingLimitDays)
            await requestRaised.save()
            res.status(200).json({
                message: `User tag for the user ${requestRaised.userId.name} has been scanned successfully, now you can borrow the book ${requestRaised.bookId.name}`
            })
        } else {
            res.status(404)
            throw new Error("Either the request for the book was not raised, or the book tag was not scanned first, or the user tag is already scanned")
        }
        return
    }
    let book = await Book.findOne({"rfid" : cardId})
    if(book) {
        let requestRaisedForBorrowing = await Request.findOne({
            bookId: book._id,
            isBooked: true,
            isBorrowed: false,
            isReturned: false,
            isCancelled: false,
            isClosed: false,
            isBookScanned: false,
            isUserScanned: false,
        }).populate("bookId").populate("userId");
        
        if(requestRaisedForBorrowing) {
            requestRaisedForBorrowing.isBookScanned = true
            await requestRaisedForBorrowing.save()
            res.status(201).json({
                message: `Book tag for the book ${requestRaisedForBorrowing.bookId.name} is successfully scanned, now scan your user tag for the user ${requestRaisedForBorrowing.userId.name} for borrowing.`
            })
            return
        }

        let requestRaisedForReturning = await Request.findOne({
            bookId: book._id,
            isBooked: true,
            isBorrowed: true,
            isReturned: false,
            isCancelled: false,
            isClosed: false,
            isBookScanned: true,
            isUserScanned: true,
        }).populate("userId").populate("bookId");

        if(requestRaisedForReturning) {

            let borrowedTime = new Date(requestRaisedForReturning.borrowedAt)
            let minimumMinutes = 1

            let minimumTime = add_minutes(borrowedTime, minimumMinutes)

            if (new Date() >= minimumTime) {
                requestRaisedForReturning.isReturned = true;
                requestRaisedForReturning.returnedAt = new Date();
                requestRaisedForReturning.isClosed = true;
                requestRaisedForReturning.closedAt = new Date();
                let updatedRequestRaisedForReturning = await requestRaisedForReturning.save();

                //check the fine amount here
                let borrowedDate = new Date(
                    requestRaisedForReturning.borrowedAt
                );
                let differenceBetweenBorrowAndReturn = subtract_days(
                    borrowedDate,
                    new Date()
                );
                let fineAmntForCurBook = 0
                let userDetails = await User.findById(
                    requestRaisedForReturning.userId._id
                );
                let totalFineAmnt = userDetails.fineAmount;
                if (differenceBetweenBorrowAndReturn > borrowingLimitDays) {
                    let diff = differenceBetweenBorrowAndReturn - borrowingLimitDays;
                    fineAmntForCurBook = diff * requestRaisedForReturning.bookId.finePerDay;

                    updatedRequestRaisedForReturning.fineAmount = fineAmntForCurBook
                    await updatedRequestRaisedForReturning.save()

                    userDetails.fineAmount += fineAmntForCurBook;
                    totalFineAmnt = userDetails.fineAmount
                    await userDetails.save()
                }

                //send sms/email to the users, since this book has become available for borrowing
                if(requestRaisedForReturning.usersRaisingRequest) {
                    let listOfUserIds = requestRaisedForReturning.usersRaisingRequest;
                    listOfUserIds.forEach(async(uId)=>{
                        let singleUser = await User.findById(uId)
                        if(singleUser) {
                            let phone = singleUser.phone
                            let email = singleUser.email
                            await sendEmail(email, "Book availability intimation mail" ,`The book ${requestRaisedForReturning.bookId.name} is avaiable for borrowing, now you can block it.`)
                            SendSms(
                                phone,
                                `The book ${requestRaisedForReturning.bookId.name} is avaiable for borrowing, now you can block it.`
                            );
                        }
                    })
                }

                res.status(201).json({
                    message: `Book tag for the book ${requestRaisedForReturning.bookId.name} successfully scanned, now the user ${requestRaisedForReturning.userId.name} can return the book. Fine amount for this book is ₹${fineAmntForCurBook} and total fine amount to be paid is ₹${totalFineAmnt}`,
                });
                return;
            } else {
                res.status(400)
                throw new Error(`Wait for ${minimumMinutes} minute(s) from the time of borrowing the book inorder to return it`)
                return
            }
            
        }

        //code reaches here if book is not scanned for borrowing as well as book is not scanned for returning
        res.status(404)
        throw new Error("Either no request has been raised or the book tag has already been scanned")
        return
    }
    res.status(404)
    throw new Error("User or book not found for the given tag")
});

export const createRequest = asyncHandler(async (req, res)=>{

    const previousRequest = await Request.findOne({bookId: req.body.bookId, isBooked: true, isClosed: false}).populate("bookId")

    let curDate = new Date();
    let maximumBookingDate;

    if(previousRequest) {
        let bookedDate = new Date(previousRequest.bookedAt);

        maximumBookingDate = add_minutes(bookedDate, maximumBookingTime);

        if (curDate > maximumBookingDate) {
            previousRequest.isClosed = true;
            previousRequest.closedAt = curDate;
            previousRequest.isCancelled = true;
            previousRequest.cancelledAt = curDate;
            previousRequest.isReturned = true;
            previousRequest.returnedAt = curDate;
            await previousRequest.save();
        }
    }
    
    if(previousRequest && (curDate <= maximumBookingDate)) { 
        const userDetails = await User.findById(req.body.userId);
        let previouslyRaisedRequests = previousRequest.usersRaisingRequest
        
        //logic for adding users who have raised requrest but the book was already blocked by someone else, inorder to send sms/email whenever the book gets unblocked
        if(previouslyRaisedRequests) {
            let present = false
            previouslyRaisedRequests.forEach((userId)=>{
                if(userId.toString()===req.body.userId.toString()) {
                    present = true
                }
            })
            if(!present) {
                previouslyRaisedRequests.push(userDetails._id)
                previousRequest.usersRaisingRequest = previouslyRaisedRequests
                await previousRequest.save()
            }
        } else {
            previouslyRaisedRequests = []
            previouslyRaisedRequests.push(userDetails._id);
            previousRequest.usersRaisingRequest = previouslyRaisedRequests;
            await previousRequest.save();
        }
        
        res.status(401)
        throw new Error("Book is blocked by someone else. You will get an intimation whenever the book is available again.")
    } else {

        const userDetails = await User.findById(req.body.userId)
        if(userDetails.fineAmount > maximumFineAmount) {
            res.status(401)
            throw new Error(`Your maximum allowable fine amount exceeded ₹${maximumFineAmount}. Pay your fine first and then raise the request.`)
            return
        }

        const request = new Request({
            userId: req.body.userId,
            bookId: req.body.bookId,
            bookedAt: curDate,
            isBooked: true
        });

        let returnObj = {}
        returnObj.toBeReturnedOn = add_days(curDate, borrowingLimitDays)
        returnObj.toBeReturnedOnString = convertDateToString(returnObj.toBeReturnedOn)
        let borrowedBook = await Book.findById(req.body.bookId)
        returnObj.finePerDay = borrowedBook.finePerDay

        const raisedRequest = await request.save();
        res.status(201).json({
            message: `The book ${borrowedBook.name} has successfully been booked. It should be returned on or before ${returnObj.toBeReturnedOnString}. If delayed, the fine amount for every delayed day is ₹${returnObj.finePerDay}`
        });
    }

    
})

export const isBookedByGivenUser = asyncHandler(async (req, res) => {
    const userId = req.body.userId
    const bookId = req.body.bookId
    let request = await Request.findOne({
        bookId: bookId,
        userId: userId,
        isClosed: false
    })
    if(request) {
        res.status(200).json({
            isBooked: true
        })
    } else {
        res.status(200).json({
            isBooked: false
        })
    }
});

export const canCancelByGivenUser = asyncHandler(async (req, res) => {
    const userId = req.body.userId;
    const bookId = req.body.bookId;
    let request = await Request.findOne({
        bookId: bookId,
        userId: userId,
        isClosed: false,
        isBookScanned: false
    });
    if (request) {
        res.status(200).json({
            canCancel: true,
        });
    } else {
        res.status(200).json({
            canCancel: false,
        });
    }
});

export const cancelRequest = asyncHandler(async (req, res) => {

    const userId = req.body.userId
    const bookId = req.body.bookId
    const curDate = new Date()

    const requestToBeCancelled = await Request.findOne({
        bookId: bookId,
        userId: userId,
        isBooked: true,
        isClosed: false,
        isBookScanned: false
    }).populate("bookId");
    if(requestToBeCancelled) {
        requestToBeCancelled.isClosed = true;
        requestToBeCancelled.closedAt = curDate;
        requestToBeCancelled.isCancelled = true;
        requestToBeCancelled.cancelledAt = curDate;
        requestToBeCancelled.isReturned = true;
        requestToBeCancelled.returnedAt = curDate;
        await requestToBeCancelled.save();

        if (requestToBeCancelled.usersRaisingRequest) {
            let listOfUserIds = requestToBeCancelled.usersRaisingRequest;
            listOfUserIds.forEach(async (uId) => {
                let singleUser = await User.findById(uId);
                if (singleUser) {
                    let phone = singleUser.phone;
                    let email = singleUser.email;
                    await sendEmail(
                        email,
                        "Book availability intimation mail",
                        `The book ${requestToBeCancelled.bookId.name} is avaiable for borrowing, now you can block it.`
                    );
                    SendSms(
                        phone,
                        `The book ${requestToBeCancelled.bookId.name} is avaiable for borrowing, now you can block it.`
                    );
                }
            });
        }

        res.status(200).json({
            message: `The request for borrowing the book ${requestToBeCancelled.bookId.name} has successfully been cancelled.`,
        });
    } else {
        res.status(404)
        throw new Error("Can't cancel the request because either the book was scanned for borrowing or no such request was raised for borrowing.")
    }
});

export const findRequestsByUserId = asyncHandler(async (req, res) => {
    const userId = req.body.userId;
    let requests = await Request.find({
        userId: userId
    }).populate("bookId");
    if (requests) {
        res.status(200).json(requests);
    } else {
        res.status(404)
        throw new Error(`Some error occured while fetching the requests`);
    }
});

export const fetchAllRequests = asyncHandler(async (req, res) => {
    let requests = await Request.find().populate("bookId").populate("userId");
    if (requests) {
        res.status(200).json(requests);
    } else {
        res.status(404)
        throw new Error(`Some error occured while fetching the requests.`)
    }
});

export const individualRequest = asyncHandler(async (req, res) => {
    let request = await Request.findById(req.body.id).populate("bookId").populate("userId");
    let userId = req.body.userId
    if (request) {
        if(userId === request.userId._id.toString() || req.user.isAdmin) {
            res.status(200).json(request);
        }
        else {
            res.status(401)
            throw new Error(`Bad authorization, this request was not raised by you.`)    
        }
    } else {
        res.status(404)
        throw new Error(`No such request is found.`);
    }
});
