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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  uniqueKey:{
    type:String,
  }
});


const Company = mongoose.model("Company", companySchema);
export default Company;
