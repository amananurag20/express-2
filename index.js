const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const foodRouter = require("./routes/foodRoutes");
const userRouter = require("./routes/userRoutes");
require('dotenv').config()
const app = express();

app.use(express.json()); //json->object
app.use(express.urlencoded({ extended: false })); //urlencoded->readbale

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//mongodb+srv://amananurag20:g8ZfkMnjxhlpRbRY@cluster0.dvbzhdh.mongodb.net/

const dbConnect = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL
    );
    console.log("db connected successfully");
  } catch (e) {
    console.log(e);
  }
};

dbConnect();

app.get("/", async (req, res) => {
  res.send("<h1>working.....</h1>");
});

app.use("/foods", foodRouter);

app.use("/user", userRouter);

//http://localhost:5000/foods/:id
//http://localhost:5000/user/signup

app.listen(5000, () => {
  console.log("server is running on port:5000");
});
