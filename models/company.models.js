import mongoose from "mongoose";
import jwt from "jsonwebtoken"

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  companyEmail: {
    type: String,
    required: true,
    unique: true,
  },
  companyPassword: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  companyType: {
    type: String,
    required: true,
  },
  avararUrl: {
    type: String,
  },
  gstInNumber: {
    type: String,
    required: true,
    unique: true,
  },
  adminsAuth: [
    {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      password: {
        type: String,
      },
    },
  ],
  isVerifyed: {
    type: Boolean,
    default: false,
  },
});

export const generateAccessToken = async (id) => {
  const result =  jwt.sign(
    {
      id: id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    }
  );

  return result;
};

const Company = mongoose.model("Company", companySchema);
export default Company;
