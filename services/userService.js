import Event from "../database/schema/eventSchema.js";
import User from "../database/schema/userSchema.js";
import { userId } from "../middleware/userMiddleware.js";
import ErrorWithStatus from "../exceptions/errorStatus.js";
import QR from "qrcode";
import {sendEmail} from "../utils/sendEmail.js"
import fs from 'fs'
import { unlink } from 'node:fs';


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

        //check if the tickets available match
        //deduct the amount of tickets from tickets available
        if(eventToCheck.ticketsAvailable < amount){
            throw new ErrorWithStatus("We don't have enough tickets", 400)
        }else{
            let newAmount = eventToCheck.ticketsAvailable - amount
            await Event.findOneAndUpdate({_id: ticketsToBuy}, {ticketsAvailable: newAmount})
        }
        //add to the users bought, user id and amount

        if(eventToCheck.usersBought.length > 0){
        for(let i = 0; i < eventToCheck.usersBought.length; i++){{
            for(let key in eventToCheck.usersBought[i]){
                if(eventToCheck.usersBought[i][key] === userId){
                    eventToCheck.usersBought[i].ticketsBought = (parseInt(eventToCheck.usersBought[i].ticketsBought) + parseInt(amount)).toString()
                    eventToCheck.markModified("usersBought")
                    await eventToCheck.save()
                }
            }
        }}
        }

    
        eventToCheck.usersBought.push({user: userId, ticketsBought: amount})
        eventToCheck.ticketsSold = eventToCheck.ticketsSold + parseInt(amount)
        await eventToCheck.save();

        //userschema, add event to array and total amount of tickets bought
        const userUpdate = await User.findById(userId);
	    userUpdate.purchaseIdCounter++;
        const purchaseId = userId + userUpdate.purchaseIdCounter;
        userUpdate.eventsBoughtTicketsFor.push({event: ticketsToBuy, amountOfTickets: amount, purchaseId: purchaseId, name: userUpdate.name, userId: userId, eventName: eventToCheck.name, qrCodeScanned: "false"})
        await userUpdate.save()
        //userschema, add amount of tickets to total
        const userToUpdate = await User.findById(userId);
        let newTicketTotal = userToUpdate.totalAmountOfTicketsBought + parseInt(amount)
        await User.findOneAndUpdate({_id: userId}, {totalAmountOfTicketsBought: newTicketTotal})

     

        // let data = {
        //     id: userId,
        //     name: userToUpdate.name,
        //     ticketsBought: amount,
        //     event:  eventToCheck.name,
        //     eventId: ticketsToBuy,
        //     link: "https://livescore.com",
        //     link: "localhost:3000/verify"
        // }

        // let stringdata = JSON.stringify(data);

        const qrCodeString = await QR.toDataURL(`http://localhost:3000/verify/${purchaseId}`)
        
        let qrCodeImage = qrCodeString.split(';base64,').pop();

        fs.writeFile('image.png', qrCodeImage, {encoding: 'base64'}, function(err) {
                console.log('File created');
            });
    
        
        await sendEmail(userToUpdate.email, "Ticket QRCode" , `Please view the QR Code attached for the ${eventToCheck.name}`, "QRCode.png", "image.png");

        unlink('image.png', (err) => {
        if (err) throw err;
        console.log('image.png was deleted');
        }); 

         return {
            message: "Tickets Purchased",
            events: await getAllEvents(),
        }
    }
    catch(error){
        throw new ErrorWithStatus(error.message, 500)
    }
}


