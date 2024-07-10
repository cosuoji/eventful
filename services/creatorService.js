import Event from "../database/schema/eventSchema.js";
import User from "../database/schema/userSchema.js";
import {userId} from "../middleware/authMiddleware.js"
import { creatorUserId } from "../middleware/creatorMiddleware.js";
import ErrorWithStatus from "../exceptions/errorStatus.js";

export const addEvent = async(name, address, ticketsAvailable)=>{
    try{

        const newEvent = new Event({name, address, ticketsAvailable, creator: creatorUserId});
        await newEvent.save();
        return {
            message: "new event created",
            events: await getAllEvents()
        }

    } catch(err){
        return {
            "status": err
        }
    }
}



export const getAllEvents = async() =>{
  try{
    const eventToDisplay = await Event.find({creator: creatorUserId})
    const user = await User.findById(creatorUserId)
    //console.log(user)
    const listOfEvents = [];
    const listOfEventIds = [];
    //console.log(userToDsiplay)
    
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
        user: user.name
    }

    }
    catch(err){
        throw new ErrorWithStatus(err.message, 500)
    }
}



export const updateEvent = async (eventId, name, address, ticketsAvailable) =>{
    try{
        const eventToUpdate = await Event.findOne({_id: eventId})
        //console.log(toDoChecker)

        if(!eventToUpdate){
            throw new ErrorWithStatus("event not found", 400)
        }

        if(eventToUpdate[0].creator !== userId){
            throw new ErrorWithStatus("You don't have permission to edit this", 400)
        }

        

        await Event.findOneAndUpdate({_id:eventToUpdate}, {name: name, address: address, ticketsAvailable: ticketsAvailable})
        return {
            message: "Changes Saved",
            data:{
                body: eventToUpdate,
                lastOne: await getAllEvents()
            }
        }
        
        
    }
    catch(error){
        throw new ErrorWithStatus(error.message, 500)
    }

}

export const deleteEvent = async(eventToDelete) =>{
    try{    
        const eventChecker = await Event.find({_id: eventToDelete})
        if(eventChecker.length < 1){
            throw new ErrorWithStatus("event not found", 400)
        }

        if(eventChecker[0].creator !== userId){
            throw new ErrorWithStatus("You don't have permission to edit this", 400)
        }

        await Event.findOneAndDelete({_id: eventChecker})

        return {
            message: "Event Deleted",
            todos: await getAllEvents(),
        }
    }
    catch(error){
        throw new ErrorWithStatus(error.message, 500)
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