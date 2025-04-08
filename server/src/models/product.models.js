import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
      image: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: { 
        type: String,
        required:true
      },
      category: {
        type: String,
        required: true,
      },
      brand: { 
        type: String,
        required:true
      },
      seller:{
        type:String,
        required:true
      },
      price: { 
        type: Number,
        required:true
      },
      saleprice: { 
        type: Number,
      },
      stock: { 
        type: Number,
        required:true
      },
      
},{timestamps:true})

export const Product=mongoose.model("Product",productSchema);