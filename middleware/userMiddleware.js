import jwt from "jsonwebtoken"
import blacklist from "../database/schema/blacklistSchema.js";
import { tokenToUse, role } from "../controller/authController.js"
const JWT_SECRET=process.env.JWT_SECRET


export const userMiddleware = async (req, res, next) =>{
        // set the retrieved token to authorization
    const authorization = tokenToUse;
    const loginRole = role;

    const checkIfBlackListed = await blacklist.findOne({token: tokenToUse});

    if(checkIfBlackListed){
        return res
            .status(401)
            .json({message: "This session has expired. Please login"})
    }


    if(!authorization || loginRole !== "User"){
        return res.status(401).json({message: "Create events"})
    }

      jwt.verify(authorization, JWT_SECRET, (err, decoded)=>{
        if(err){
            return res.status(401).json({message: "Unauthorized"})
        }

    
        
        req.user = decoded
        emailId = decoded.email
        userId = decoded._id
        next();
    })

}


