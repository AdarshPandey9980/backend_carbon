import express from "express";
import {sendOtpToEmail,verifyOtp} from "../middleware/verifyOtp.middleware.js"
const router = express.Router();

router.route("/sent-otp").post(sendOtpToEmail)
router.route("/verify-otp").post(verifyOtp)


export default router


