import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item through API

const addFood = async (req, res) => {
  console.log("addFoodbody------>", req.body);
  console.log("addFoodfile------>", req.file);

  let image_filename = req.file.filename;

  // const food = new foodModel({
  //   name: req.body.name,
  //   description: req.body.description,
  //   price: req.body.price,
  //   category: req.body.category,
  //   image: image_filename,
  // });

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: req.file.path, // Cloudinary URL
  });
  try {
    await food.save();
    res.json({
      success: true,
      message: "Food Added",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error ",
    });
  }
};

// add food item
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({
      success: true,
      data: foods,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

// remove food item
const removeFood = async (req, res) => {
  try {
    const foodItem = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${foodItem.image}`, () => {});

    if (foodItem) await foodModel.findByIdAndDelete(req.body.id);
    res.json({
      success: true,
      message: "Food Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "error",
    });
  }
};

export { addFood, listFood, removeFood };
