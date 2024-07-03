
import { Router } from "express";
import { generateMiddleware } from "../middleware/generatedMiddleware.js";
import * as authController from "../controller/authController.js"
import { loginSchema, registerSchema } from "../validations/authValidations.js";



dotenv.config()
const authRoute = Router()


authRoute.get('/', async(req, res)=> {
   res.render('loginSelections', {
    title: 'Eventful',
  });
});

authRoute.get('/userlogin', async(req, res)=> {
   res.render('loginSelections', {
    title: 'Eventful',
  });
});

authRoute.get('/creatorlogin', async(req, res)=> {
   res.render('loginSelections', {
    title: 'Eventful',
  });
});



export default authRoute