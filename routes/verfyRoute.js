import { Router } from "express";
import * as verifyController from "../controllers/verifyController.js"

const verifyRoute = Router();

verifyRoute.get("/:purchaseid", verifyController.verifyQrCode)
verifyRoute.post("/:purchaseid", verifyController.acceptDetails)
verifyRoute.post("/", verifyController.updateQRScanned)

export default verifyRoute
