import * as userService from "../services/userService.js"
//import client from "../utils/redis.js"



export const getAllEvents = async(req, res)=>{
    try{
    const result = await userService.getAllEvents()
     res.render("user.ejs", {listOfEvents: result.eventList, arrayOfIds: result.eventIdArray})

    }catch(error){
        res.status(500).json({message: error.message})
    }
}
export const oneEvent = async(req, res)=>{
    try{
        const eventId = req.params.id
        const result = await userService.oneEvent(eventId)
        //console.log(result)
        res.render("userEventPages", {name: result.message.name, address: result.message.address, ticketsAvailable: result.message.ticketsAvailable, date: result.message.date} )
    } catch(error){
        res.status(500).json({message: error.message})
    }
}

export const purchaseTickets = async(req,res) =>{
    try{
        const {amount, ticketsToBuy} = req.body
        const result = await userService.purchaseTickets(ticketsToBuy, amount)
        res.json(result)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

export const displayAnalytics = async(req, res)=>{
    try{
        const result = await userService.displayAnalytics()
        res.render("userProfile", {ticketData: JSON.stringify(result.ticketInfo), tabledata: JSON.stringify(result.eventArray)})
    } catch(error){
        res.status(500).json({message: error.message})
    }
}

export const reminderScheduler = async(req, res) =>{

    try {
    const {datetime, eventName, eventTime} = req.body
    const result = await userService.reminderScheduler(datetime, eventName, eventTime);
    res.status(200).json({success: "Reminder Created Successfully", data: result})
    } catch (error) {
        res.status(500).json({ message: error.message})
    }

}