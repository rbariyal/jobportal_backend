const jwt=require('jsonwebtoken')
const dotenv = require("dotenv")
dotenv.config()
const secret=process.env.JWT_SECRET
const JWT_SECRET=secret;
const fetchjobs=(req,res,next)=>
{
    //get the user from the jwt token and add id to req object

    const token=req.header('auth-token');
    if(!token)
    {
        res.status(401).send({error:"Please autheticate using a valid token"})
    }
    try {
        const data=jwt.verify(token,JWT_SECRET)
        req.user=data.user;
    next();
    } catch (error) {
        res.status(401).send({error:"Please autheticate using a valid token"})
    }


}
module.exports=fetchjobs;
