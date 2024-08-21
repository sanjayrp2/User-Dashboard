const express=require("express");
const mongoose =require("mongoose");
const cors =require("cors")
const bcrypt=require("bcrypt");
const app=express();

app.use(express.json());
app.use(cors());
const mongoDBURL="mongodb://127.0.0.1:27017/UserDashboard";

mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("Connected to database");
    
})
.catch((error)=>console.log(error));

app.listen(7000,()=>console.log("Server Started"));

const userRoutes=require('./Routes/User_Routes');

app.use('/user',userRoutes);

const {authenticationToken}=require("./Middleware/jwt");

app.get('/protected-route',authenticationToken,(req,res)=>{
    res.send("This is a protected route")
});