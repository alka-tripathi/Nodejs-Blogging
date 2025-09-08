const mongoose = require("mongoose");

const userSchema=mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    salt:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profileImageUrl:{
        type:String,
        default:"/images/default.pn"
    }
})