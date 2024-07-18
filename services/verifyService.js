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