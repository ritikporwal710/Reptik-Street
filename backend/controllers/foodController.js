import foodModel from "../models/foodModel.js";
import fs from 'fs';


// add food item through API

const addFood = async(req,res) =>{
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.
    })
}

export {addFood};