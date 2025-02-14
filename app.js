import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import otpRoute from "./routes/verifyEmail.routes.js"
import companyRoute from "./routes/company.routes.js"
dotenv.config()

const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.use("/api/otp",otpRoute)
app.use("/api/company",companyRoute)

export default app