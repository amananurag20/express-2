const express= require("express");

const router= express.Router();

const {
  signup,
  login,
  checkToken,
  logout,
  profile,
} = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");

router.post("/signup",signup );
//http://localhost:5000/user/signup
router.post("/login",login)

router.get("/logout",logout)

router.get("/check-token",checkToken)


router.get("/profile",verifyToken,profile)

module.exports=router;
