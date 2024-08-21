const mongoose=require("mongoose");

const UserDetailsSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    count:{
        type:Number,
        default:0
    },
    lastlogindate:{
        type:Date
    },
    role:{
        type:String,
        required:true
    }

},{collection:"UserInfo"});

const User=mongoose.model("UserInfo",UserDetailsSchema)
module.exports=User;