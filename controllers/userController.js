const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken")


const signup=async (req, res)=> {
  const { name, email, mobile, password, profilePic } = req.body;

  if (!name || !email || !password) {
    return res.json({ message: "please give all data", success: false });
  }

  try{
    const user= await userModel.findOne({email});
    if(user){
      return res.json({msg:"user already exist", success:false})
    }
  }catch(e){
    console.log(e);
    return res.json({ message: "something went wrong", success: false });
  }


  const hashPassword=  await bcrypt.hash(password,10);
  console.log(hashPassword);
  
  try {
    const user = await userModel.create({
      name: name,
      email: email,
      password:hashPassword,
      mobile,
      profilePic,
    });

    res.json({ user, success: "true" });
  } catch (e) {
    console.log(e);
    res.json({ message: "something went wrong", success: false });
  }
}

const login=async(req,res)=>{

  const {email,password}= req.body;

  if(!email || !password){
    return res.json({msg:"give full credential",success:false})
  }
  
  //we need to check user exist or not 

  const user=await userModel.findOne({email});
 

  if(!user){
    return res.json({msg:"user does not exist", success:false})
  }
  
  const isPasswordCorrect= await bcrypt.compare(password,user.password);

  if(!isPasswordCorrect){
    return res.json({msg:"Wrong credential",success:false})
  }

  //create token
  
  const token= jwt.sign({id:user._id, email:user.email,role:user.role},process.env.SECRET_KEY,{
    expiresIn:"1h"
  })
  
  // res.cookie("aman","12345",{
  //    maxAge:1000*60,
  //   //expires: new Date(Date.now()+1000*60*60),
  //    httpOnly: true,
     
  // })
  // res.cookie("game","gta 5",{
  //    maxAge:1000*10,
  //   //expires: new Date(Date.now()+1000*60*60),
  //    httpOnly: true,
     
  // })

  res.cookie("token",token,{
     maxAge:1000*60*30,  
     httpOnly: true,
     secure:false
  })

  res.json({msg:"user successfully loggedin", success:true})

}


const logout=(req,res)=>{

  // res.clearCookie("token",{

  // });

  res.cookie("token","",{
    maxAge:0
  })
  res.json({msg:"user logout",success:true})
}

const checkToken=(req,res)=>{

   const token=req.cookies.token;
   console.log(token)
  
      try{
          const userData=jwt.verify(token,process.env.SECRET_KEY);
          res.json({success:true, msg:"correct token"})       
         
      }catch(e){
          // console.log(e)
          res.json({msg:"invalid token", success:false})
      }

}


const profile=async(req,res)=>{
   
  const user= await userModel.findOne({email:req.user.email},"-password")

  res.json({user, success:true})
}


module.exports={
    signup, login, logout, checkToken, profile
}