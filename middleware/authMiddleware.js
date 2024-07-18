import jwt from "jsonwebtoken"
import blacklist from "../database/schema/blacklistSchema.js";
import { tokenToUse} from "../controllers/authController.js"
export let userId
const JWT_SECRET=process.env.JWT_SECRET


export const authMiddleware = async (req, res, next) =>{
        // set the retrieved token to authorization
    const authorization = tokenToUse;

    const checkIfBlackListed = await blacklist.findOne({token: tokenToUse});

    if(checkIfBlackListed){
        return res
            .status(401)
            .redirect("/")
            //.json({message: "This session has expired. Please login"})
            
    }


    if(!authorization){
        return res.status(401).redirect("/")
        //.json({message: "Not Authorized to create or view events"}).redirect("/")
    }

      jwt.verify(authorization, JWT_SECRET, (err, decoded)=>{
        if(err){
            return res.status(401)
            .redirect("/")
            //.json({message: "Unauthorized"})
        }     
        req.user = decoded
        emailId = decoded.email
        userId = decoded._id
        next();
    })

}


