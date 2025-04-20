import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth'
import adminProductReducer from "./admin/product-slice/index.js"
import shopProductReducer from "./shop/product-slice/index.js"
import wishlistReducer from "./shop/wishList-slice/index.js"
import cartReducer from "./shop/cart-slice/index.js"
import addressReducer from './shop/address-slice/index.js'
import profileReducer from './shop/profile-slice/index.js'
import shopOrder from './shop/order-slice/index.js'
import adminOrder from './admin/order-slice/index.js'

export const store=configureStore({
    reducer:{
        auth:authReducer,
        adminProduct:adminProductReducer,
        shopProduct:shopProductReducer,
        wishlistProduct:wishlistReducer,
        shopCart:cartReducer,
        shopAddress:addressReducer,
        shopProfile:profileReducer,
        shopOrder:shopOrder,
        adminOrder:adminOrder
    }
})

