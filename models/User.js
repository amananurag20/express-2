const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  mobile: String,
  password: {
    type: String,
    minLength: 3,
  },
  profilePic: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzHMDlwRCHOHZP_tX7jRYNxV8W8MpNEog45w&s",
  },
  role:{
    type:String,
    enum:["user","admin"],
    default:"user"
  }
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
