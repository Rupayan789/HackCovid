const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    try
    {
        const token=req.headers.authorization.split(" ")[1];
        const decode=jwt.verify(token,process.env.SECRET_KEY);
        req.userData=decode;
        next();
    }
    catch(err){
        return res.status(404).json({message:"Unauthorized Access"});
    }
    
}