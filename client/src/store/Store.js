import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import adminProductReducer from "./admin/product-slice/index.js"


export const store=configureStore({
    reducer:{
        auth:authReducer,
        adminProduct:adminProductReducer

    }
})

