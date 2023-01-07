import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/Users.js";
import books from "./data/Books.js";
import User from "./models/UserModel.js";
import Book from "./models/BookModel.js";
import Request from "./models/RequestModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
    try {
        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleBooks = books.map((book) => {
            return { ...book, user: adminUser };
        });

        await Book.insertMany(sampleBooks);

        console.log("Data Imported!");
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Request.deleteMany();
        await Book.deleteMany();
        await User.deleteMany();

        console.log("Data Destroyed!");
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
