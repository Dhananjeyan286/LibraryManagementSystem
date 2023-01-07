import express from "express";
const router = express.Router();
import { authUser, getUserProfile, registerUser } from "../controllers/UserController.js";
import { protect } from "../middleware/AuthMiddleware.js"

// /api/users

router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);

export default router;
