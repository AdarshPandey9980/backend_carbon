import express from "express"
import {upload} from "../middleware/multer.middleware.js"
import {registerCompany} from "../controller/company.controller.js"

const router = express.Router()

router.route("/register").post(upload.single("avatar"),registerCompany)

export default router
