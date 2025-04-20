import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState={
    isLoading:false,
    orderId:null,
    orderList:null,


}

export const createCOD=createAsyncThunk('/order/createCOD',async(orderData)=>{
    const response=await axios.post(`${import.meta.env.VITE_BACKEND}/api/shop/order/createCOD`,orderData);
    return response.data;
})



export const createNewOrder=createAsyncThunk('/order/createNewOrder',async(orderData)=>{
    const response=await axios.post(`${import.meta.env.VITE_BACKEND}/api/shop/order/create`,orderData);
    return response.data;
})


export const captureOrder=createAsyncThunk('/order/captureOrder',async({razorpay_payment_id,razorpay_order_id,razorpay_signature,orderId})=>{
    const response=await axios.post(`${import.meta.env.VITE_BACKEND}/api/shop/order/capture`,
        {razorpay_payment_id,razorpay_order_id,razorpay_signature,orderId}
    );
    return response.data;
})


export const fetchOrder=createAsyncThunk('/order/fetchOrder',async(userId)=>{
    const response=await axios.get(`${import.meta.env.VITE_BACKEND}/api/shop/order/fetchOrders/${userId}`);
    return response.data;
})

export const fetchOrderDetail=createAsyncThunk('/order/fetchOrderDetail',async(Id)=>{
    const response=await axios.get(`${import.meta.env.VITE_BACKEND}/api/shop/order/fetchOrdersDetail/${Id}`);
    return response.data;
})


const shoppingOrderSlice=createSlice({
    name:'shoppingOrderSlice',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(createNewOrder.pending,(state)=>{
            state.isLoading=true;
        }).addCase(createNewOrder.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.orderId=action.payload.orderId;
            sessionStorage.setItem('currentOrderId',JSON.stringify(action.payload.orderId))

        }).addCase(createNewOrder.rejected,(state)=>{
            state.isLoading=false;
            state.orderId=null;
        }).addCase(fetchOrder.pending,(state)=>{
            state.isLoading=true;
        }).addCase(fetchOrder.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.orderList=action.payload.orders;            
        }).addCase(fetchOrder.rejected,(state)=>{
            state.isLoading=false;
            state.orderId=null;
        }).addCase(createCOD.pending,(state)=>{
            state.isLoading=true;
        }).addCase(createCOD.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.orderList=action.payload.orders;            
        }).addCase(createCOD.rejected,(state)=>{
            state.isLoading=false;
            state.orderId=null;
        })
        
    }
})



export default shoppingOrderSlice.reducer;