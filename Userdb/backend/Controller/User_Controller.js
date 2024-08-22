const User=require("../Models/User");
const bcrypt=require("bcrypt");
const jwt =require('jsonwebtoken');
const SECRETE_KEY='supersecret';
const moment=require("moment")

module.exports.UserRegister=async(req,res)=>{
    var { name, email, password, gender} = req.body;
    const role="user";
    try{
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).send({status:"error",message:"User alredy existing with"})
        }
        password=await bcrypt.hash(password,13);
        const data=new User({email,password,name,gender,role});
        await data.save();
        return res.status(201).send({status:"ok"});
    }
    catch(error){
        return res.status(500).send({status:"error",message:"An error occurs during registration"})
    }
};


module.exports.UserLogin=async(req,res)=>{
    const {email,password}=req.body;
    try{
        let user=null;
        let role=null;
        user=await User.findOne({email});
        if(user){
            role="admin";
        }
        else{
            user=await User.findOne({email})
            if(user){
                role="user";
            }
        }
        if(!user){
            return res.json({error:"User Not Found"})
        }
        const valid=await bcrypt.compare(password,user.password);
        if(valid){
            const today = new Date();
            const lastLoginDate = new Date(user.lastlogindate);
            if (
                lastLoginDate.getDate() !== today.getDate() ||
                lastLoginDate.getMonth() !== today.getMonth() ||
                lastLoginDate.getFullYear() !== today.getFullYear()||
                lastLoginDate.getTime()!==today.getTime()
            ) {
                user.count += 1; 
            }
            user.lastlogindate = today;
            await user.save(); 
            const token = jwt.sign({ id: user._id, role: role }, SECRETE_KEY,{ expiresIn: '8h' });
            const formattedLastLoginDate = moment(user.lastlogindate).format('YYYY-MM-DD HH:mm:ss');
            return res.json({status:"ok",role:user.role,email:user.email,name:user.name,gender:user.gender,token:token,lastlogindate:formattedLastLoginDate,count:user.count})
        }
        else{
            return res.json({status:"error",error:"Invalid Password"})
        }
       
    } catch(error){
        console.log(error);
        return res.status(500).send({status:"ok",error:"Invalid server error"})
        
    }
}