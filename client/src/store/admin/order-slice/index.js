import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const initialState={
    isLoading:false,
    allOrderList:null
}


export const fetchAllOrders=createAsyncThunk("/admin/fetchAllProduct",async ()=>{
    const response=await axios.get(`${import.meta.env.VITE_BACKEND}/api/admin/orders/fetchAllOrders`)
    return response.data;
})


export const updateOrderStatus=createAsyncThunk("/admin/updateOrderStatus",async ({orderId,orderStatus})=>{
    const response=await axios.post(`${import.meta.env.VITE_BACKEND}/api/admin/orders/updateStatus/`,{orderId,orderStatus})
    return response.data;
})


const adminOrderSlice=createSlice({
    name:"adminOrder",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchAllOrders.pending,(state)=>{
            state.isLoading=true
        }).addCase(fetchAllOrders.fulfilled,(state,action)=>{
            state.isLoading=false
            state.allOrderList=action?.payload
        }).addCase(fetchAllOrders.rejected,(state)=>{
            state.isLoading=false
            state.allOrderList=null
        }).addCase(updateOrderStatus.pending,(state)=>{
            state.isLoading=true
        }).addCase(updateOrderStatus.fulfilled,(state,action)=>{
            state.isLoading=false
            state.allOrderList=action?.payload?.orders
        }).addCase(updateOrderStatus.rejected,(state)=>{
            state.isLoading=false
            state.allOrderList=null
        })
    }

})

export default adminOrderSlice.reducer