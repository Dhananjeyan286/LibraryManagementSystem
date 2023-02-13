import express from "express";
const router = express.Router();
import { authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser, verifyCredentials, resendOTP, savePaymentDetails } from "../controllers/UserController.js";
import { protect, admin } from "../middleware/AuthMiddleware.js"

// /api/users

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.route("/verify").post(verifyCredentials)
router.route("/resend").post(resendOTP)
router.post("/login", authUser);
router
    .route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);
router
    .route("/:id")
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);
router.route("/fine").post(protect, savePaymentDetails)

export default router;
