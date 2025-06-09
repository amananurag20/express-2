const jwt= require("jsonwebtoken")


const verifyToken=(req,res,next)=>{
  
    // const token=req.headers.authorization.split(" ")[1];
    const token=req.cookies.token;
  //check token-
    try{
        const userData=jwt.verify(token,process.env.SECRET_KEY);
        req.user=userData;
        
        next();
    }catch(e){
        console.log(e)
        res.json({msg:"invalid token", success:false})
    }


}


module.exports=verifyToken;