import * as verifyService from "../services/verifyService.js"

export const verifyQrCode = async(req, res)=>{
    res.render("verifypage")

}

export const acceptDetails = async(req, res)=>{
    try{
        const {purchaseId} = req.body
        const result = await verifyService.acceptDetails(purchaseId)
        res.json(result)
    }catch(error){
        res.status(500).json({message: error.message})

    }
}

export const updateQRScanned = async(req, res)=>{
    try{
        const {eventId, totalTickets, purchaseId} = req.body
        const result = await verifyService.updateQRScanned(eventId, totalTickets, purchaseId)
        res.json(result)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}