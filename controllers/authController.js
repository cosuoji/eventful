import * as authService from "../services/authService.js"
export let tokenToUse, role



export const login = async (req, res, next)=>{
    try {
        const { email, password} = req.body;
        const token = await authService.login(email, password)
        tokenToUse = token.data.accessToken
        role = token.data.user

        //console.log(req.path, token)

        if(tokenToUse){
            req.header.authorization = "Bearer" + tokenToUse
        }
        if(role === "User" && req.path !== "/userlogin") {
            console.log("user account, redirection")
            res.redirect("/userlogin")
        }
        else if(role === "User" && req.path === "/userlogin") {
          res.redirect("/user")
        } else if (role === "Creator" && req.path !== "/creatorlogin") {
            console.log("creator account, redirection")
            res.redirect("/creatorlogin")
        } else{
            res.redirect("/creator")
        }
    }
    catch(err){
        res.status(err.status || 500);
        res.json({message: err.message})
    }
}


export const register = async (req, res)=>{
    try {
    const {name,password,email} = req.body
    const path = req.url
    await authService.register(name,email,password, path)
    if(path === "/usersignup") res.redirect("/userlogin")
    if(path === "/creatorsignup") res.redirect("/creatorlogin")
    }
    catch(err){
        res.status(err.status || 500);
        res.json({messsage: err.message}) 
    }
}


export const logout = async(req, res) =>{
    try{
        await authService.logout(tokenToUse);
        res.redirect("/")
    } catch(err){
        res.status(err.status || 500);
        res.json({message: err.message})
    }
}

export const forgotPassword = async(req, res) =>{
    try{
        const {email} = req.body
        let result = await authService.forgotPassword(email);
        res.json({result})
    }
    catch(err){
        res.status(err.status || 500);
        res.json({message: err.message})
    }
}

export const resetPassword = async(req, res) =>{
    try{
        const {userId, token}  = req.body
        const newToken = token
        const {password} = req.body
        const newPassword = password
        const result = await authService.resetPassword(userId, newPassword, newToken)
        res.json({result})
    } catch(err){
        res.status(err.status || 500);
        res.json({message: err.message}) 
    }
}