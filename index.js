import connectDB from "./db/db.js";
import app from "./app.js";
import dotenv from "dotenv";
import {saveEmissionData} from "./controller/randomData.controller.js"
dotenv.config();

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        setInterval(async() => {
         await saveEmissionData() 
        console.log("data sent successfully");
          
        },30000)
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})