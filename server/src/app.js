import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth/auth.routes.js"
import adminProductRoutes from "./routes/admin/AdminProduct.routes.js"
import shopProductRoutes from "./routes/shop/product.routes.js"
import shopWishlistRoutes from "./routes/shop/wishlist.routes.js"
import shopCartRoutes from "./routes/shop/cart.routes.js"
import shopAddressRoutes from "./routes/shop/address.routes.js"
import shopProfileRoutes from './routes/shop/profile.routes.js'


const app=express();


app.use(
    cors({
        origin:['http://localhost:5173','https://e-commerce-front-eta-rosy.vercel.app/'],
        methods:['GET','POST','DELETE','PUT'],
        allowedHeaders:[
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma",
            "Accept",
            "Origin"
        ],
        
        
        credentials:true,
    })
)


app.use(express.urlencoded(
    {
        extended:true,
    }
));
app.use(express.json({
    limit:"16kb",
}));
app.use(cookieParser());
app.use(express.static("public"));


app.use('/api/auth',authRouter);
app.use('/api/admin/products',adminProductRoutes);
app.use('/api/shop/products',shopProductRoutes);
app.use('/api/shop/wishlist',shopWishlistRoutes);
app.use('/api/shop/cart',shopCartRoutes);
app.use('/api/shop/address',shopAddressRoutes);
app.use('/api/shop/profile',shopProfileRoutes);



export {app};


