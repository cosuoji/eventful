import Event from "../database/schema/eventSchema.js";
import User from "../database/schema/userSchema.js";
import { userId } from "../middleware/userMiddleware.js";
import ErrorWithStatus from "../exceptions/errorStatus.js";

export const getAllEvents = async() =>{
  try{
    const timeframe = new Date().toISOString().slice(0, new Date().toISOString().lastIndexOf(":"))
    const eventToDisplay = await Event.find({date: {
        $gte: timeframe
    }})
    
    const listOfEvents = [];
    const listOfEventIds = [];
   
    
    //loop through the Events's and push the to the array
    for(let i = 0; i < eventToDisplay.length; i++){
        listOfEvents.push(eventToDisplay[i].name)
    } 

    //loop through the Events's and push ids the to the array
    for(let i = 0; i < eventToDisplay.length; i++){
        listOfEventIds.push(eventToDisplay[i]._id.toHexString())
    }  
    

    return {
        eventList: listOfEvents,
        eventIdArray: listOfEventIds,
    }

    }
    catch(err){
        throw new ErrorWithStatus(err.message, 500)
    }
}

export const oneEvent = async(eventId)=>{
    try{
        const eventToView = await Event.findById(eventId)
        return {
            message: eventToView
        }

    } catch(error){
        throw new ErrorWithStatus(error.message, 500)
    }
}

export const purchaseTickets = async(ticketsToBuy, amount) =>{
    try{
        const eventToCheck = await Event.findById(ticketsToBuy)
        if(eventToCheck.length < 1){
            throw new ErrorWithStatus("event not found", 400)
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}
