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
    const JWT_SECRET = process.env.JWT_SECRET 
    const token = jwt.sign({
        email: user.email,
        _id: user._id,
        sub: user._id,
    },

        //Set it to expire in an hour
        JWT_SECRET, {expiresIn: "1hr"})

        return{
            message: "Login Successful",
            data: {
                accessToken: token,
                user: user.role,
            }
        }

}

export const register = async (name, email, password,path) =>{
    //check if email exists
    const user = await User.findOne({email})
    if(user){
        throw new ErrorWithStatus("user already exists", 400)
    }

    let role = ""

    if(path === "/creatorsignup"){
       role = "Creator"
    } else {
        role = "User"
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
            throw new ErrorWithStatus("user not found, 404")
        }

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

    const link = `${process.env.BASE_URL}/forgot/${user._id}/${token.token}`;
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

export const resetPassword = async(userId, newPassword, newToken) =>{
    try{

     // find the user with the id from the token
    const user = await User.findById({_id: userId});

    if (!user) {
       throw new ErrorWithStatus("user not found",404)
    }
   
    const token = await Token.findOne({
            userId: user._id,
            token: newToken,
     });
    if (!token) {
        throw new ErrorWithStatus("Invalid Token", 500)
    }



    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    newPassword  = await bcrypt.hash(newPassword, 10);


    // Update user's password, clear reset token and expiration time
    user.password = newPassword;
    await user.save();

    // Send success response
    return{ message: "Password updated" }

}catch(err){
       // Send error response if any error occurs
    throw new ErrorWithStatus(err.message, 500)
}
}