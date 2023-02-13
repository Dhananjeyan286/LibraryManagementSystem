import express from "express";
const router = express.Router();
import { processCardID, createRequest, canCancelByGivenUser, isBookedByGivenUser, cancelRequest, findRequestsByUserId, fetchAllRequests, individualRequest, editRequest, getSuggestions } from "../controllers/RequestController.js";
import { protect, admin } from "../middleware/AuthMiddleware.js";

// /api/request

router.route("/").get(processCardID)
router.route("/create").post(protect, createRequest)
router.route("/cancel").post(protect, cancelRequest)
router.route("/booked").post(protect, isBookedByGivenUser)
router.route("/canCancel").post(protect, canCancelByGivenUser)
router.route("/fetch").post(protect, findRequestsByUserId)
router.route("/individual").post(protect, individualRequest)
router.route("/admin/all").post(protect, admin, fetchAllRequests)
router.route("/edit").post(protect, admin, editRequest)
router.route("/suggestion").get(protect, getSuggestions)

export default router;
