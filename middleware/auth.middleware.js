import jwt from "jsonwebtoken"

const generateAccessToken = async (id) => {
    const result = await jwt.sign(
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

const verifyJwt = async(req,res,next) => {
    try {
        const token = await req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")
        if (!token) {
          return res.status(300).json({message:"unauthorized access",isSuccess:true})
        }
        
        const decodeToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        if(!decodeToken){
            return res.status(300).json({message:"unauthorized access",isSuccess:true})
        }

        req.userId = decodeToken.id
        next()
    } catch (error) {
       return res.status(500).json({message:"Something went wrong"})
    }
}

export {verifyJwt,generateAccessToken}