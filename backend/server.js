import express from "express";
import dotenv from "dotenv";
import BookRoutes from "./routes/BookRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/ErrorMiddleware.js";
import path from "path"
import UploadRoutes from "./routes/UploadRoutes.js"
import morgan from "morgan";

dotenv.config();

connectDB()

const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api/books", BookRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/upload", UploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);
