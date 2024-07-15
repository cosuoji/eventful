import * as creatorService from "../services/creatorService.js"

export const addEvent = async(req, res)=>{
    try{
        //console.log(req.body)
        const {name, address, ticketsAvailable, date}  = req.body;
        const result = await creatorService.addEvent(name, address, ticketsAvailable, date);
        res.render("creator.ejs", {listOfEvents: result.events.eventList, arrayOfIds: result.events.eventIdArray, username: result.user})

    }
    catch(error){
        res.status(error.status || 500);
        res.json({message: error.message})
    }

}

export const getAllEvents = async(req, res) =>{
    try{
        const result = await creatorService.getAllEvents()
        //console.log(result)
        res.render("creator.ejs", {listOfEvents: result.eventList, arrayOfIds: result.eventIdArray, username: result.user})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}




// export const updateEvent = async(req, res)=>{
//     try {
//         const eventId = req.body.todoId;
//         const {name, address, ticketsAvailable} = req.body
//         const result = await toDoService.updateToDo(eventId, name, address, ticketsAvailable)
//         res.json(result)
//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//     }
// }



export const deleteEvent = async(req,res) =>{
    try{
        const eventToDelete = req.body.event
        const result = await creatorService.deleteEvent(eventToDelete)
        res.json(result)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

export const oneEvent = async(req, res)=>{
    try{
        const eventId = req.params.id
        const result = await creatorService.oneEvent(eventId)
        //console.log(result)
        res.render("eventPages", {name: result.message.name, address: result.message.address, ticketsAvailable: result.message.ticketsAvailable, date: result.message.date} )
    } catch(error){
        res.status(500).json({message: error.message})
    }
}

export const displayAnalytics = async(req, res)=>{
    try{
        const result = await creatorService.displayAnalytics()
        res.render("creatorprofile", {analyticsArray: JSON.stringify(result.result)})
    } catch(error){
        res.status(500).json({message: error.message})
    }
}