import express from "express"
import {upload} from "../middleware/multer.middleware.js"
import {registerCompany,loginCompany,getCurrentUser} from "../controller/company.controller.js"
import {verifyJwt} from "../middleware/auth.middleware.js"

const router = express.Router()

router.route("/register").post(upload.single("avatar"),registerCompany)
router.route("/login").post(loginCompany)
router.route("/current-user").get(verifyJwt,getCurrentUser)

export default router
