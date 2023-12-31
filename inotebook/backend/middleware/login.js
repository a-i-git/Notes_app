var jwt=require('jsonwebtoken');
const JWT_SEC="fwwsfisabi$$$";

const fetchuser=(req,res,next)=>{
    //Get the user from the JWT token and add id to req object
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate with a valid token"});
    }
    try{
        const data=jwt.verify(token,JWT_SEC);
        req.user=data.user;
        next();
    }
    catch(error){
        console.log(error.message);
        res.status(401).send({error:"Please authenticate with a valid token"});
    }
}

module.exports=fetchuser;