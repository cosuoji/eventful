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
        trim: true,
    },
  creator:{
     type:String,
    },
    ticketsAvailable:{
        type: Number, 
        required: true,
    }, 
    date:{
        type: Date,
        required: true,
        min: new Date().toISOString().slice(0, new Date().toISOString().lastIndexOf(":"))
    }, 
    usersBought:{
	type: Array,
	default: [],
    }, 
    ticketsSold:{
        type: Number, 
        default: 0
    },
    qrCodesScanned:{
        type: Number, 
        default:0,
    }
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