import mongoose from "mongoose";


const eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    address:{
        type:String,
        required: true,
    },
    creator:{
        type:String,
    },
    ticketsAvailable:{
        type: Number, 
        required: true,
    }, 
}, {
    timestamps: true
})

eventSchema.set("toJSON", {
    virtuals: true, 
    versionKey: false, 
    transform: function(doc, ret){
        delete ret._id
    }
})

const Event = mongoose.model("event", eventSchema)
export default Event