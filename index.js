const express = require("express");
const mongoose = require("mongoose");

const verifyToken = require("./middleware/verifyToken");
const cookieParser= require("cookie-parser")
const cors = require("cors");
const { signup, login, checkToken, logout, profile } = require("./controllers/userController");
const foodRouter= require("./routes/foodRoutes")
const app = express();



app.use(express.json()); //json->object
app.use(express.urlencoded({ extended: false })); //urlencoded->readbale

app.use(cookieParser())
app.use(cors({
  origin:"http://localhost:5173",
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

app.post("/signup",signup );

app.post("/login",login)

app.get("/logout",logout)

app.get("/check-token",checkToken)


app.get("/profile",verifyToken,profile)

app.get("/",async(req,res)=>{

  res.send("<h1>working.....</h1>")

})


app.use("/foods",foodRouter);

//http://localhost:5000/foods/:id



app.listen(5000, () => {
  console.log("server is running on port:5000");
});
