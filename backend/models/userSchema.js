import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    role:{
        type:String,
        enum:["customer", "admin"],
        default:"customer"
    },
    isBlocked:{
        type:Boolean,
        default:false
    }
},
    {
        timestamps: true
    }
)

const User = mongoose.model("users", userSchema);

export default User;