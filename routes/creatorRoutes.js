import { Router } from "express";
import * as creatorController from "../controllers/creatorController.js"
import { creatorMiddleware } from "../middleware/creatorMiddleware.js";
import {generateMiddleware} from "../middleware/generatedMiddleware.js"
import { eventSchema } from "../validations/authValidations.js";


const creatoRoute = Router();


creatoRoute.get("/", creatorMiddleware, creatorController.getAllEvents)
creatoRoute.post("/", creatorMiddleware,  generateMiddleware(eventSchema), creatorController.addEvent)
creatoRoute.put("/", creatorMiddleware,  creatorController.updateEvent)
creatoRoute.delete("/", creatorMiddleware, creatorController.deleteEvent)
creatoRoute.get("/events/:id", creatorMiddleware, creatorController.oneEvent)

export default creatoRoute