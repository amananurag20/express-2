const express= require("express");
const verifyToken = require("../middleware/verifyToken");
const { getAllFoods, getFoodById, createFoods, updateFood, deleteFood } = require("../controllers/foodController");

const router= express.Router();
//http://localhost:5000/foods/:id

router.get("/",getAllFoods);
router.get("/:id",getFoodById);
router.post("/",createFoods)
router.put("/:id",verifyToken,updateFood)
router.delete("/:id",verifyToken,deleteFood)

module.exports= router;
