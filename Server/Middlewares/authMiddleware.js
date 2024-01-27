const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

const AuthMiddle = async(req,res,next) => {
    
    const token = req.header("Authorization");

    if(!token){
        return res.status(401).json({
            msg:"Unauthorized HTTP, Token Not Provided"
        })
    }

    const jwtToken = token.replace("Bearer","").trim()

    try {

        const TokenVerify = jwt.verify(jwtToken,process.env.JWT_SECERETE)

        const UserData = await User.findOne({email:TokenVerify.email})
        .select({ password:0})

        req.user=UserData;
        req.token=token;
        req.userId = UserData._id;

        next()
    } catch (error) {
        console.log("verify token error",error);
    }
}

module.exports = AuthMiddle;