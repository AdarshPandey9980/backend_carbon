import Company from "../models/company.models.js";
import {generateAccessToken} from "../middleware/auth.middleware.js"
import bcrypt from "bcryptjs";
import uploadOnCloud from "../utils/cloudnary.utils.js"
import fs from "fs"

const registerCompany = async (req,res) => {
    try {
      const {name,companyEmail,companyPassword,phone,address,city,state,country,companyType,gstInNumber} = req.body;
      if (!name || !companyEmail || !companyPassword || !phone || !address || !city || !state || !country || !companyType || !gstInNumber) {
        return res.status(400).json({ message: "All fields are required",isSuccess:false });
      }

      const user = await Company.find({email:companyEmail})

      if (user.length > 0) {
        return res.status(400).json({ message: "Email already exists",isSuccess:false });
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

      const lastFourId = company._id.toString().slice(-4);
      const uniqueKey = `${name}${lastFourId}`;
      company.uniqueKey = uniqueKey;


      await company.save()

      return res.status(200).json({message:"company registered successfully",isSuccess:true})

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const loginCompany = async (req,res) => {
  try {
    const {email,password} = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required",isSuccess:false });
    }

    const company = await Company.findOne({companyEmail:email})

    const isPasswordCorrect = await bcrypt.compare(password,company.companyPassword)

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials",isSuccess:false });
    } 

    const token = generateAccessToken(company._id)

    if (!token) {
      return res.status(500).json({message:"something went wrong ",isSuccess:false})
    }

    res.cookie("accessToken",token, { maxAge: 900000, httpOnly: true,secure:true })
    return res.status(200).json({message:"company logged in successfully",isSuccess:true,token:token})

  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}

const getCurrentUser = async (req,res) => {
  try {
    const userId = req.userId

    if(!userId){
      return res.status(404).json({message:"user not found",isSuccess:false})
    }

    const user = await Company.findById(userId)

    if (!user) {
      return res.status(404).json({message:"company not found ",isSuccess:false})
    }
  } catch (error) {
    return res.status(500).json({message:"something went wrong"})
  }
}

const createAdminForCompany = async (req,res) => {
  try {
    const {name,email,password} = req.body
    const userId = req.userId

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required",isSuccess:false });
    }

    if (!userId) {
      return res.status(404).json({message:"company not found ",isSuccess:false})
    }

    const company = await Company.findById(userId)

    if (!company) {
      return res.status(404).json({message:"company not found ",isSuccess:false})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    company.adminsAuth.push({ name, email, password: hashedPassword});
    await company.save();

    return res.status(200).json({message:"admin created successfully",isSuccess:true})

  } catch (error) {
    return res.status(500).json({message:"something went wrong"})
  }
}

const loginAdmin = async (req,res) => {
  try {
    const {key,email,password} = req.body

    if (!key || !email || !password) {
      return res.status(404).json({message:"all the field are required",isSuccess:false})
    }

    const company = await Company.findOne({uniqueKey:key})

    const adminUser = company.adminsAuth.find((user) => user.email === email)
    
    if (!adminUser) {
      return res.status(404).json({message:"admin user not found",isSuccess:false})
    }

    const isPasswordCorrect = await bcrypt.compare(password,adminUser.password)

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials",isSuccess:false });
    }

    return res.status(200).json({message:"admin logged in successfully",isSuccess:true})

  } catch (error) {
    return res.status(500).json({message:"something went wrong"})
  }
}

const updatePassword = async (req,res) => {
  try {
    const {password} = req.body

    const userId = req.userId

    if (!password || !userId) {
      return res.status(404).json({message:"all the field are required",isSuccess:false})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = await Company.findByIdAndUpdate(userId,{$set:{companyPassword:hashedPassword}})

    if(!user) {
      return res.status(404).json({message:"user not found",isSuccess:false})
    }

    return res.status(200).json({message:"password updated successfully",isSuccess:true})

  } catch (error) {
    return res.status(500).json({message:"something went wrong"})
  }
}

export {registerCompany,loginCompany,getCurrentUser,createAdminForCompany,loginAdmin,updatePassword}