import { Product } from "../../models/product.models.js";
import { Wishlist } from "../../models/wishlist.model.js";


const addToWishList=async(req,res)=>{
    try {
        const {userId,productId}=req.body;
        if(!userId || !productId){
            return res.status(400).json({
                success:false,
                message:"Invalid userid or product id"
            })
        }

        const product=await Product.findById(productId);
        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }

        let wishlist=await Wishlist.findOne({userId});
        if(!wishlist){
            wishlist=new Wishlist({
                userId,
                products:[productId]
            })
        }
        else{
            if(!wishlist.products.includes(productId)){
                wishlist.products.push(productId);
            }
            else{
                return res.status(200).json({
                    success:true,
                    message:"Product already exist in wishlist",
                    wishlist
                })
            }
        }

        await wishlist.save();

        return res.status(200).json({
            success: true,
            message: "Product added to wishlist",
            wishlist
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error on adding product to wishlist"
        })
    }
}

const fetchWishlistProduct=async(req,res)=>{
    try {
        const {userId}=req.params;
        const wishlist=await Wishlist.findOne({userId}).populate("products")
        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: "Wishlist not found"
            });
        }
        res.status(200).json({
            success: true,
            wishlist,
        });

    } catch (error) {
        console.error("Wishlist fetch error:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

const wishlistItemDelete = async (req, res) => {
    try {
      const { userId, productId } = req.params;
  
      if (!userId || !productId) {
        return res.status(400).json({
          success: false,
          message: "Invalid userId or productId",
        });
      }
  
      const wishlist = await Wishlist.findOneAndUpdate(
        { userId },
        { $pull: { products: productId } },
        { new: true } // return the updated wishlist
      ).populate("products");
  
      if (!wishlist) {
        return res.status(404).json({
          success: false,
          message: "Wishlist not found",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Product removed from wishlist",
        wishlist,
      });
  
    } catch (error) {
      console.error("Wishlist remove error:", error);
      return res.status(500).json({
        success: false,
        message: "Server error while removing product from wishlist",
      });
    }
  };

export {addToWishList, fetchWishlistProduct, wishlistItemDelete}