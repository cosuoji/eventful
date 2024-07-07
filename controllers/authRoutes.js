
import { Router } from "express";
import {generateMiddleware} from "../middleware/generatedMiddleware.js"
import * as authController from "../controllers/authController.js"
import { loginSchema, passwordSchema, registerSchema, resetSchema } from "../validations/authValidations.js";




const authRoute = Router()


authRoute.get('/', async(req, res)=> {
   res.render('loginSelections', {
    title: 'Eventful',
  });
});

authRoute.get('/usersignup', async(req, res)=> {
   res.render('userSignup')
});

authRoute.get('/userlogin', async(req, res)=> {
   res.render('userLogin')
});

authRoute.get('/creatorsignup', async(req, res)=> {
   res.render('creatorSignup')
});

authRoute.get('/forgot', async(req, res)=> {
   res.render('forgot')
});

authRoute.get('/creatorlogin', async(req, res)=> {
   res.render('creatorlogin')
});

authRoute.get("/forgot/:userId/:token", async(req, res)=>{
  res.render("reset")
})

authRoute.get("/logout", authController.logout)


authRoute.post('/usersignup', generateMiddleware(registerSchema), authController.register)
authRoute.post('/userlogin', generateMiddleware(loginSchema), authController.login)
authRoute.post('/creatorsignup', generateMiddleware(registerSchema), authController.register)
authRoute.post('/creatorlogin', generateMiddleware(loginSchema), authController.login)
authRoute.get("/logout", authController.logout)
authRoute.post("/forgot", generateMiddleware(resetSchema), authController.forgotPassword)
authRoute.post("/forgot/:userId/:token", generateMiddleware(passwordSchema), authController.resetPassword)

export default authRoute