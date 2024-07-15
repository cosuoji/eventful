import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type: String, 
        required: true,
    }, 
    role:{
        type:String,
        default: "User"
    },
    eventsBoughtTicketsFor:{
        type: Array,
        default: []
    },
    totalAmountOfTicketsBought:{
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

userSchema.set("toJSON", {
    virtuals: true, 
    versionKey: false, 
    transform: function(doc, ret){
        delete ret._id
    }
})

const User = mongoose.model("user", userSchema)
export default User