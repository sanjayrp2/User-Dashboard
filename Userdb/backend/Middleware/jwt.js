const jwt=require('jsonwebtoken');
const SECRETE_KEY="supersecrate";

function authenticationToken(req,res,next){
    const token=req.header('Authorization')?.split(' ')[1];
    if(!token){
        return res.status(401).send({status:"error",message:"Access Denied"})
    }
    try{
        const verified=jwt.verify(token,SECRETE_KEY);
        req.user=verified;
        next();
    }
    catch{
        res.status(400).send({status:"error",message:"Invalid token"});

    }
}
module.exports={authenticationToken};