import jwt from "jsonwebtoken"
import blacklist from "../database/schema/blacklistSchema.js";
import { tokenToUse, role } from "../controllers/authController.js"
export let creatorUserId 
import dotenv from "dotenv"
dotenv.config()

const JWT_SECRET=process.env.JWT_SECRET


export const creatorMiddleware = async (req, res, next) =>{
        // set the retrieved token to authorization
    const authorization = tokenToUse;
    const loginRole = role;

    const checkIfBlackListed = await blacklist.findOne({token: tokenToUse});

    if(checkIfBlackListed){
        return res
            .status(401)
            //.json({message: "This session has expired. Please login"})
            .redirect("/")
    }


    if(!authorization || loginRole !== "Creator"){
        return res.status(401).redirect("/")
        //.json({message: "No permission to Create events"}).redirect("/")
    }

      jwt.verify(authorization, JWT_SECRET, (err, decoded)=>{
        if(err){
            return res.status(401).redirect("/")
            //.json({message: "Unauthorized", error: err})
        }

    
        
        req.user = decoded
        //emailId = decoded.email
        creatorUserId  = decoded._id
        next();
    })

}


