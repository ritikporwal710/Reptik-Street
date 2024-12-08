import userModel from "../models/userModel.js";

// add to cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({
      success: true,
      message: "Added to Cart",
    });
  } catch (error) {
    console.log("error");
    res.json({
      success: false,
      message: "error in adding to cart",
    });
  }
};

// remove from cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({
      success: true,
      message: "Removed from cart",
    });
  } catch (error) {
    console.log("error", error);
    res.json({
      success: false,
      message: "Error in remove from cart",
    });
  }
};

// get cart
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({
      success: true,
      cartData,
    });
  } catch (error) {
    console.log("error", error);
    res.json({
      success: false,
      message: "Error in getCart",
    });
  }
};

export { addToCart, removeFromCart, getCart };
