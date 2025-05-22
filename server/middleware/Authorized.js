

const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")
dotenv.config()

const secret = process.env.JWT_SECRET
exports.isAuthorized = async (req,res,next)=>{

        try {
            const token = req.headers.authorization.split(" ")[1]
            let decodedData ;
            const customAuth = token.length < 500
            if(token && customAuth){
                decodedData = jwt.verify(token,secret)
                req.userId = decodedData.id._id
                req.userRole = decodedData.id.role
            }
            else{
                decodedData = jwt.decode(token)
                req.userId = decodedData.id._id
                req.userRole = decodedData.id.role


            }
            // console.log(req.userRole)
            next()

        } catch (error) {
            return res.status(403).json({message:"Unauthorized Access",redirect:"/auth/login"})
        }

}

exports.isNormalUser = async(req,res,next)=>{
    try {
        if(req.userRole !== "user") return res.status(403).json({message: "Unauthorized action"})
        next();
    } catch (error) {
        return res.status(400).json({message:"Unauthorized action"})
    }
}