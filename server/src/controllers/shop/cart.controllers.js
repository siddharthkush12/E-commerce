import { Product } from "../../models/product.models.js";
import { Cart } from "../../models/cart.models.js";




const addCartItem=async(req,res)=>{
    try {
        
        const {userId, productId, quantity}=req.body;
        if(!userId || !productId || quantity<=0){
            return res.status(400).json({
                success:false,
                message:"Invalid userId or productId or quantity"
            })
        }

        const product =await Product.findById(productId);
        if(!product){
            return res.status(404).json({
                success:false,
                message:"product not found"
            })
        }

        let cart=await Cart.findOne({userId});
        if(!cart){
            cart=new Cart({userId,items:[]})
        }

        const findCurrentProductIndex=cart.items.findIndex(
            (item)=>item.productId.toString()===productId
        )

        if(findCurrentProductIndex===-1){
            cart.items.push({productId,quantity})
        }
        else{
            cart.items[findCurrentProductIndex].quantity+=quantity
        }

        await cart.save();

        res.status(200).json({
            success:true,
            message:"Added to Cart",
            data:cart
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"failed to add on cart"
        })
    }
}





const fetchCartItem=async(req,res)=>{
    try {
        
        const {userId}=req.params;
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"Invalid userId for fetch"
            })
        }

        const cart=await Cart.findOne({userId}).populate({
            path:'items.productId',
            select:"image title price saleprice stock"
        })

        if(!cart || cart.items.length===0){
            return res.status(200).json({
                success:true,
                message:"cart is empty",
                data:{
                    items:[],
                    userId
                }
            })
        }

        const validItems=cart.items.filter((productItem)=>productItem.productId)

        if(validItems.length<cart.items.length){
            cart.items=validItems
            await cart.save()
        }

        const populateCartItems=validItems.map(item=>({
            productId:item.productId._id,
            image:item.productId.image,
            title:item.productId.title,
            price:item.productId.price,
            saleprice:item.productId.saleprice,
            stock:item.productId.stock,
            quantity:item.quantity,
        }))

        res.status(200).json({
            success:true,
            message:"cart fetched",
            data:{
                ...cart._doc,
                items:populateCartItems
            }
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"failed to fetch on cart"
        })
    }
}





const updateCartItem=async(req,res)=>{
    try {
        const {userId, productId, quantity}=req.body;
        if(!userId || !productId || quantity<=0){
            return res.status(400).json({
                success:false,
                message:"Invalid userId or productId or quantity for update"
            })
        }

        const cart =await Cart.findOne({userId});
        if(!cart){
            return res.status(404).json({
                success:false,
                message:"cart not found"
            })
        }


        const findCurrentProductIndex=cart.items.findIndex(
            (items)=>items.productId.toString()===productId
        )

        if(findCurrentProductIndex===-1){
            return res.status(404).json({
                success:false,
                message:"cart item not found"
            })
        }
        
        cart.items[findCurrentProductIndex].quantity=quantity
        
        await cart.save();

        await cart.populate({
            path: 'items.productId',
            select:'image title price salePrice stock'
        })

        const populateCartItems=cart.items.map(item=>({
            productId: item.productId._id ? item.productId._id : null,
            image:item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "product not found",
            price: item.productId ? item.productId.price : null,
            saleprice: item.productId ? item.productId.saleprice : null,
            stock: item.productId ? item.productId.stock : null,
            quantity: item.quantity,
        }))

        res.status(200).json({
            success:true,
            message:"Cart Updated",
            data:{
                ...cart._doc,
                items:populateCartItems
            }
        })  

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"failed to add on cart"
        })
    }
}





const deleteCartItem=async(req,res)=>{
    try {
    
        const {userId, productId}=req.params;
        if(!userId || !productId){
            return res.status(400).json({
                success:false,
                message:"Invalid userId or productId"
            })
        }

        const cart=await Cart.findOne({userId}).populate({
            path:"items.productId",
            select:"image title price saleprice",
        })

        if(!cart){
            return res.status(404).json({
                success:false,
                message:"cart not found"
            })
        }
        
        cart.items=cart.items.filter((item)=>item.productId._id.toString()!==productId);

        await cart.save();

        await cart.populate({
            path: 'items.productId',
            select:'image title price salePrice'
        })

        const populateCartItems=cart.items.map(item=>({
            productId: item.productId._id ? item.productId._id : null,
            image:item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "product not found",
            price: item.productId ? item.productId.price : null,
            saleprice: item.productId ? item.productId.saleprice : null,
            quantity: item.quantity,
        }))

        res.status(200).json({
            success:true,
            message:"Cart Deleted",
            data:{
                ...cart._doc,
                items:populateCartItems
            }
        })  
         


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"failed to delete on cart"
        })
    }
}


export {addCartItem, fetchCartItem, updateCartItem, deleteCartItem}