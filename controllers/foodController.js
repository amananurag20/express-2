const foodModel = require("../models/Food");

 
 
 
 exports.getAllFoods=async(req,res)=>{
   
   console.log("cookie",req.cookies)
   
   const foods= await foodModel.find({});
 
   res.json({foods,success:true})
 
 }

 exports.getFoodById=async(req,res)=>{
 
   const id= req.params.id;
 
   console.log(req.headers)
   
   const foods= await foodModel.findById(id);
   
   res.setHeader("x-name","amananurag");
   res.setHeader("x-company","byeee");
 
   res.json({foods,success:true})
 
 }


 exports.createFoods=async(req,res)=>{
 
   // {name:"maagee", price:100, description:"best food",category:"Beverage"};
     
   try{
     const foods= await foodModel.create(req.body);
     res.json({foods,success:true})
   }catch(e){
     console.log(e)
     res.json({success:false,msg:"something went wrong"})
   }
 }


 exports.updateFood=async(req,res)=>{
 
     const id= req.params.id;
     const foods= await foodModel.findByIdAndUpdate(id,req.body,{new:true})
 
   res.json({success:true,foods})
 }

 exports.deleteFood=async(req,res)=>{
    const id= req.params.id;

    if(req.user.role=="admin"){

      const foods= await foodModel.findByIdAndDelete(id)
  
      res.json({foods, success:true})
    }else{
      res.json({msg:"you are not admin", success:false})
    }
}