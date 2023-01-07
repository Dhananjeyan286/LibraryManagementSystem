import express from "express";
const router = express.Router();
import { getBooks, getBookById } from "../controllers/ProductController.js"

// /api/books

router.route("/").get(getBooks);
router.route("/:id").get(getBookById);

export default router;
