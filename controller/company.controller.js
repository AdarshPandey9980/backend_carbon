import Company from "../models/company.models.js";
import bcrypt from "bcryptjs";
import uploadOnCloud from "../utils/cloudnary.utils.js"
import fs from "fs"

const registerCompany = async (req,res) => {
    try {
      const {name,companyEmail,companyPassword,phone,address,city,state,country,companyType,gstInNumber} = req.body;
      if (!name || !companyEmail || !companyPassword || !phone || !address || !city || !state || !country || !companyType || !gstInNumber) {
        return res.status(400).json({ message: "All fields are required",isSuccess:false });
      }

      const avatarLocalPath = req.file?.path;

      const avatar = await uploadOnCloud(avatarLocalPath);

      fs.unlinkSync(avatarLocalPath)

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(companyPassword, salt);
      const hashedGstIn = await bcrypt.hash(gstInNumber, salt);

      const company = new Company({
        name,
        companyEmail,
        companyPassword: hashedPassword,
        phone,
        address,
        city,
        state,
        country,
        companyType,
        gstInNumber:hashedGstIn,
        avatar:avatar.url || null,
      });

      await company.save()

      return res.status(200).json({message:"company registered successfully",isSuccess:true})

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export {registerCompany}