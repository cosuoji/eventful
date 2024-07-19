import Event from "../database/schema/eventSchema.js";
import User from "../database/schema/userSchema.js";
import ErrorWithStatus from "../exceptions/errorStatus.js"

export const acceptDetails = async(purchaseId)=>{
    try{
        const userToCheck = await User.find({role: "User"})
        let search = userToCheck[0].eventsBoughtTicketsFor
        let answer;
        for(let i = 0; i < search.length; i++){
            for(let key in search[i]){
                if(search[i][key] === purchaseId){
                    answer  = search[i]
                }
            }
        }
        
        return {
            data: answer
        }

    }  catch(error){
        throw new ErrorWithStatus(error.message, 500)
    }
}

export const updateQRScanned = async(eventId, totalTickets, purchaseId)=>{
    try{
        const eventToUpdate = await Event.findById(eventId);
        const result = await acceptDetails(purchaseId)
        let report, userInfo; 
        if(result.data.qrCodeScanned === "true"){
            return {
                message: "Ticket Already Verified"
            }
        } else{
          eventToUpdate.qrCodesScanned = eventToUpdate.qrCodesScanned + parseInt(totalTickets)
          const userToUpdate = await User.findById(result.data.userId)
          const userData = userToUpdate.eventsBoughtTicketsFor

         for(let i = 0; i < userData.length; i++){
            for(let key in userData[i]){
                if(userData[i][key] === purchaseId){
                    userInfo = userData[i]
                    userData[i].qrCodeScanned = "true"
                    userToUpdate.markModified("eventsBoughtTicketsFor")
                    await userToUpdate.save()
                    report = userData[i].qrCodeScanned
                }
            }
            
        }
                     
          await userToUpdate.save()
          await eventToUpdate.save()
          return {
            data: eventToUpdate,
            info: userInfo,
            report: report,
            user: userToUpdate.eventsBoughtTicketsFor
        }

        }

        

    } catch(error){
        throw new ErrorWithStatus(error.message, 500)
    }
}

