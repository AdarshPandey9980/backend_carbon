import { sendOtp } from "../utils/resentEmailService.utils.js";
// import Student from "../models/student.model.js";

const sendOtpToEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email ) {
      return res.status(400).json({ message: "email and name is requied" });
    }

    const {name} = req.body || "carbon"

    const { otp, data, error } = await sendOtp(email, name);

    if (error) {
      return res.status(400).json({ message: "failed to send otp",isSuccess:false });
    }

    return res.status(200).json({otp:otp, message: "otp send successfully",isSuccess:true });
  } catch (error) {
    return res.status(500).json({ message: "failed to send otp" });
  }
};

// const sendOtpToEmailViaAadhar = async (req, res, next) => {
//   try {
//     const { aadharCardNumber } = req.body;
//     console.log(aadharCardNumber);
    
//     if (!aadharCardNumber ) {
//       return res.status(400).json({ message: "email and name is requied" });
//     }

//     const student = await Student.findOne({aadharCardNumber})

//     console.log(student.email);
    

//     const name ="digisir"

//     const { otp, data, error } = await sendOtp(student.email, name);
//     console.log(data);
    

//     if (error) {
//       return res.status(400).json({ message: "failed to send otp",isSuccess:false });
//     }

//     return res.status(200).json({otp:otp, message: "otp send successfully",isSuccess:true });
//   } catch (error) {
//     return res.status(500).json({ message: "failed to send otp" });
//   }
// };

const verifyOtp = async (req, res) => {
  try {
    const { userotp } = req.body;
    const { otp } = req.body;
    console.log(otp);
    console.log(userotp.toString());
    
    if (!userotp) {
      return res.status(200).json({ message: "user otp is required" });
    }

    if (userotp === otp) {
      return res
        .status(200)
        .json({ message: "otp verifyed", isVerified: true });
    } else {
      return res
        .status(200)
        .json({ message: "incorrect otp", isVerified: false });
    }
  } catch (error) {
    return res.status(500).json({ message: "failed to verify otp" });
  }
};

export { sendOtpToEmail, verifyOtp };
