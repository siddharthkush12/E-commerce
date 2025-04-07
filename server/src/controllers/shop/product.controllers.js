import { Product } from "../../models/product.models.js";



const getFilteredProducts=async(req,res)=>{
    try {
        const {category=[],brand=[],sortBy="price_lowtohigh"}=req.query;

        let filters = {};

        if (category.length) {
          filters.category = { $in: category.split(",") };
        }

        if (brand.length) {
          filters.brand = { $in: brand.split(",") };
        }

        let sort={}
        switch (sortBy) {
            case "price_lowtohigh":
                sort.price=1
                break;
            case "price_hightolow":
                sort.price=-1
                break;
            case "title_atoz":
                sort.title=1
                break;
            case "title_ztoa":
                sort.title=-1
                break;
        
            default:
                sort.price=1
                break;
        }

        const products=await Product.find(filters).sort(sort); 

        res.status(200).json({
            success:true,
            data:products
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error in Filtering Products"
        })
    }
}



const getProductDetails=async(req,res)=>{
    try {
        const {id}=req.params;
        const product=await Product.findById(id);
        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }
        return res.status(200).json({
            success:true,
            data:product
        }) 

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error in Getting details of Products"
        })
    }
}


export {getFilteredProducts, getProductDetails}