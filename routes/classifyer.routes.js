import { verifyJwt} from "../middleware/auth.middleware.js";
import {createClassifyer} from "../controller/classifyer.controller.js"
import {getData} from "../controller/randomData.controller.js"
import express from "express"

const router = express.Router()


router.route("/create-classifyer").post(verifyJwt,createClassifyer)

router.route("/get-data").get(verifyJwt,getData)

export default router
