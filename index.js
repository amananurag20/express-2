const express = require("express");
const jwt= require("jsonwebtoken")
const mongoose = require("mongoose");
const userModel = require("./models/User");
const bcrypt = require("bcrypt");
const foodModel = require("./models/Food");
const verifyToken = require("./middleware/verifyToken");
const cookieParser= require("cookie-parser")
const cors = require("cors");
const app = express();

app.use(express.json()); //json->object
app.use(express.urlencoded({ extended: false })); //urlencoded->readbale

app.use(cookieParser())
app.use(cors({
  origin:["http://localhost:5173"],
  credentials:true
}))


//mongodb+srv://amananurag20:g8ZfkMnjxhlpRbRY@cluster0.dvbzhdh.mongodb.net/

const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://amananurag20:g8ZfkMnjxhlpRbRY@cluster0.dvbzhdh.mongodb.net/"
    );
    console.log("db connected successfully");
  } catch (e) {
    console.log(e);
  }
};

dbConnect();

app.post("/signup", async function (req, res) {
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
});

app.post("/login",async(req,res)=>{

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
  
  const token= jwt.sign({id:user._id, email:user.email,role:user.role},"hello",{
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
     secure:true
  })

  res.json({msg:"user successfully loggedin", success:true})

})

app.get("/logout",(req,res)=>{

  // res.clearCookie("token",{

  // });

  res.cookie("token","",{
    maxAge:0
  })
  res.json({msg:"user logout",success:true})
})

app.get("/profile",verifyToken,async(req,res)=>{
   
  const user= await userModel.findOne({email:req.user.email},"-password")

  res.json({user, success:true})
})

app.get("/",async(req,res)=>{

  res.send("<h1>working.....</h1>")

})



app.get("/foods",verifyToken,async(req,res)=>{
  
  console.log("cookie",req.cookies)
  
  const foods= await foodModel.find({});

  res.json({foods,success:true})

});

//user

app.get("/foods/:id",verifyToken,async(req,res)=>{

  const id= req.params.id;

  console.log(req.headers)
  
  const foods= await foodModel.findById(id);
  
  res.setHeader("x-name","amananurag");
  res.setHeader("x-company","byeee");

  res.json({foods,success:true})

});

app.post("/foods",async(req,res)=>{

  // {name:"maagee", price:100, description:"best food",category:"Beverage"};
    
  try{
    const foods= await foodModel.create(req.body);
    res.json({foods,success:true})
  }catch(e){
    console.log(e)
    res.json({success:false,msg:"something went wrong"})
  }
})

app.put("/foods/:id",verifyToken,async(req,res)=>{

    const id= req.params.id;
    const foods= await foodModel.findByIdAndUpdate(id,req.body,{new:true})

  res.json({success:true,foods})
})

app.delete("/foods/:id",verifyToken,async(req,res)=>{
    const id= req.params.id;

    if(req.user.role=="admin"){

      const foods= await foodModel.findByIdAndDelete(id)
  
      res.json({foods, success:true})
    }else{
      res.json({msg:"you are not admin", success:false})
    }
})

app.listen(5000, () => {
  console.log("server is running on port:5000");
});
