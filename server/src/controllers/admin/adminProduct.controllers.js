import { Product } from "../../models/product.models.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";

const handleImageUpload = async (req, res) => {
  try {
    const localPath = req.file?.path;       
    const result = await uploadOnCloudinary(localPath);

    if (!result) throw new Error("Cloudinary upload failed");

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error in uploading image!!",
    });
  }
};


// New Product By Admin

const addProduct=async(req,res)=>{
    try {
      const {image,title,description,category,brand,price,saleprice,stock,seller}=req.body;
      if(
        [image,title,description,category,brand,price,stock].some((field)=>field?.trim()==="")
      ) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }
      const createNewProduct=new Product({
        image,
        title,
        description,
        category,
        brand,
        price,
        saleprice,
        stock,
        seller
      })

      await createNewProduct.save();
      res.status(201).json({
        success:true,
        message:"Product added Successfully"
      })

    } catch (error) {
      console.log(error);
      res.status(500).json({
        success:false,
        data:createNewProduct,
        message:"Unable to add new Product"
      })  
    }
}

// Fetch all Products By admin

const fetchProduct=async(req,res)=>{
  try {
    const listProduct=await Product.find({});
    res.status(201).json({
      success:true,
      data:listProduct,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Unable to fetch Product"
    })  
  }
}



// Edit Product By admin

const editProduct=async(req,res)=>{
  try {
    const {id}=req.params;
    const {image,title,description,category,brand,price,saleprice,stock,seller}=req.body;

    const findProduct=await Product.findById(id);
    if(!findProduct) return res.status(404).json({
      success:false,
      message:"Product not found"
    })

    findProduct.title = title || findProduct.title;
    findProduct.image = image || findProduct.image;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price || findProduct.price;
    findProduct.saleprice = saleprice || findProduct.saleprice;
    findProduct.stock = stock || findProduct.stock; 
    findProduct.seller = seller || findProduct.seller; 

    await findProduct.save();
    res.status(200).json({
      success:true,
      data:findProduct
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Unable to edit Product"
    })  
  }
}



// Delete Product by admin


const deleteProduct=async(req,res)=>{
  try {
    const {id}=req.params;
    const targetProduct=await Product.findByIdAndDelete(id);
    if(!targetProduct){
      return res.status(404).json({
        success:false,
        message:" Targeted Product not found"
      })
    }
    res.status(200).json({
      success:true,
      message:"Product deleted Succesfully"
    })  

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Unable to delete Product"
    })  
  }
}



export { handleImageUpload, addProduct, fetchProduct, editProduct, deleteProduct };
