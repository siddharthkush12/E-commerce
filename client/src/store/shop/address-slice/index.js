import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState={
    isLoading:false,
    addressList:[]
}

export const addNewAddress=createAsyncThunk('/address/addAddress',async(formData)=>{

    
    const response=await axios.post(`${import.meta.env.VITE_BACKEND}/api/shop/address/add`,formData)
    return response.data;
})

export const fetchAddress=createAsyncThunk('/address/fetchAddress',async(userId)=>{
    const response=await axios.get(`${import.meta.env.VITE_BACKEND}/api/shop/address/get/${userId}`)
    return response.data;
})

export const editAddress=createAsyncThunk('/address/editAddress',async({userId,addressId,formData})=>{
    const response=await axios.put(`${import.meta.env.VITE_BACKEND}/address/update/${userId}/${addressId}`,formData)
    return response.data;
})

export const deleteAddress=createAsyncThunk('/address/deleteAddress',async({userId,addressId})=>{
    const response=await axios.delete(`${import.meta.env.VITE_BACKEND}/api/shop/address/delete/${userId}/${addressId}`)
    return response.data;
})


const addressSlice=createSlice({
    name:"address",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addNewAddress.pending,(state)=>{
            state.isLoading=true
        }).addCase(addNewAddress.fulfilled,(state,action)=>{
            state.isLoading=false;
        }).addCase(addNewAddress.rejected,(state)=>{
            state.isLoading=false
        }).addCase(fetchAddress.pending,(state)=>{
            state.isLoading=true
        }).addCase(fetchAddress.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.addressList=action?.payload?.data
        }).addCase(fetchAddress.rejected,(state)=>{
            state.isLoading=false,
            state.addressList=[]
        })
    }
})

export default addressSlice.reducer;
  