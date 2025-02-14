import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
   companyEmail: {
        type: String,
        required: true
    },
    companyPassword: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    companyType:{
        type: String,
        required: true
    },
    avararUrl: {
        type:String
    },
    gstInNumber:{
        type:String,
        required: true
    },
    adminsAuth:[
        {
            name:{
                type:String,
            },
            email:{
                type:String,
            },
            password:{
                type:String,
            }
        }
    ],
    isVerifyed:{
        type: Boolean,
        default: false
    }
    })


const Company = mongoose.model('Company', companySchema);
export default Company