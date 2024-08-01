import { Router } from "express";
import * as userController from "../controllers/userController.js"
import { userMiddleware } from "../middleware/userMiddleware.js";


const useRoute = Router();


useRoute.get("/", userMiddleware, userController.getAllEvents)
useRoute.post("/", userMiddleware, userController.purchaseTickets)
useRoute.get("/events/:id", userMiddleware, userController.oneEvent)

export default useRoute