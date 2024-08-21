const express =require("express");
const router=express.Router();

const { UserRegister, UserLogin } = require("../Controller/User_Controller");

router.post('/signup',UserRegister);
router.post('/login',UserLogin);

module.exports=router;