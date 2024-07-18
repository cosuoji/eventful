import { Router } from "express";
import * as verifyController from "../controllers/verifyController.js"

const verifyRoute = Router();

verifyRoute.get("/:purchaseid", verifyController.verifyQrCode)
verifyRoute.post("/", verifyController.acceptDetails)

export default verifyRoute
