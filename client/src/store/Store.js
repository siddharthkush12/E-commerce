import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth'
import adminProductReducer from "./admin/product-slice/index.js"
import shopProductReducer from "./shop/product-slice/index.js"
import wishlistReducer from "./shop/wishList-slice/index.js"


export const store=configureStore({
    reducer:{
        auth:authReducer,
        adminProduct:adminProductReducer,
        shopProduct:shopProductReducer,
        wishlistProduct:wishlistReducer
    }
})

