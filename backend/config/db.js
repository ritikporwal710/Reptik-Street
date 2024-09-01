import mongoose from "mongoose";

export const connectDB = async() =>{
    await mongoose.connect('mongodb+srv://rishu8840:8423610029@cluster0.j3aux.mongodb.net/Reptik').
    then(()=> console.log("DB Connection Successfully"));
}