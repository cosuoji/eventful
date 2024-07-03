import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
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
        requires: true,
    }, 
    role:{
        type:String,
        default: "User"
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

const User = mongoose.model("User", userSchema)
export default User