import User from "../database/schema/userSchema.js";
import ErrorWithStatus from "../exceptions/errorStatus.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import blacklist from "../database/schema/blacklistSchema.js";
import Token from "../database/schema/tokenSchema.js"
import crypto from "crypto"
import {sendEmail} from "../utils/sendEmail.js"

export const login = async (email, password) =>{
    //check if email exists
    const user = await User.findOne({email})
    if(!user){
        throw new ErrorWithStatus("user not found, 404")
    }

    //Check if password works

    if(!bcrypt.compareSync(password, user.password)){
        throw new ErrorWithStatus("username or password incorrect", 400)
    }

    //Generate the JWT Token
    const JWT_SECRET = process.env.JWT_SECRET || "secret";
    const token = jwt.sign({
        email: user.email,
        _id: user._id,
        sub: user._id
    },

        //Set it to expire in an hour
        JWT_SECRET, {expiresIn: "1hr"}   
)
        return{
            message: "Login Successful",
            data: {
                accessToken: token,
                //user: user,
            }
        }

}

export const register = async (name, email, password, creatorPath, userPath) =>{
    //check if email exists
    const user = await User.findOne({email})
    if(user){
        throw new ErrorWithStatus("user already exists", 400)
    }

    let role = ""

    if(creatorPath){
       role = "Creator"
    }
    

    password = await bcrypt.hash(password, 10);

    const newUser = new User({
        name, email, password, role: role
    })

    await newUser.save()
    delete newUser.password;

    return {
        message: "User created successfully",
        data: {
            user: newUser
        }
    }

}

export const logout = async(tokenToUse) =>{
    try{
    const checkIfBlackListed = await blacklist.findOne({token: tokenToUse});
    if(checkIfBlackListed) return res.sendStatus(204);
    const newBlacklist = new blacklist({
        token: tokenToUse
    });

    await newBlacklist.save();

    return {
        message: "You have been logged out",
    }
    }

    catch(err){
        return {
            "status": err
        }
    }
}

export const forgotPassword = async(email) =>{
    try{
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(404).send({message: "User not found"})
        }

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

    const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
    await sendEmail(user.email, "Password reset", link);

    return {
        message: "password reset link sent to your email account"
    }  
 } catch(err){
       return {
            "status": err
        }
    }
}

export const resetPassword = async(userId, newPassword, token) =>{
    try{
    // Verify the token sent by the user
    // const decodedToken = jwt.verify(
    //     senToken,
    //     process.env.JWT_SECRET_KEY
    // );

    // // If the token is invalid, return an error
    // if (!decodedToken) {
    //    return res.status(401).send({ message: "Invalid token" });
    // }



     // find the user with the id from the token
    const user = await User.findById({userId});
    if (!user) {
       return res.status(401).send({ message: "no user found, invalid or expired link" });
    }

    const token = await Token.findOne({
            userId: user._id,
            token: token,
     });
    if (!token) return res.status(400).send("Invalid link or expired");


    // Hash the new password
    const salt = await bycrypt.genSalt(10);
    newPassword = await bycrypt.hash(newPassword, salt);

    // Update user's password, clear reset token and expiration time
    user.password = newPassword;
    await user.save();

    // Send success response
    res.status(200).send({ message: "Password updated" });

}catch(err){
       // Send error response if any error occurs
    res.status(500).send({ message: err.message }); 
}
}