import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState={
    isLoading:false,
    profileList:[]
}


export const fetchProfile=createAsyncThunk('/profile/fetchProfile',async(userId)=>{
    const response =await axios.get(`${import.meta.env.VITE_BACKEND}/api/shop/profile/fetch/${userId}`)
    return response.data;
})
export const editProfile=createAsyncThunk('/profile/editProfile',async({userId,formData})=>{
    const response =await axios.put(`${import.meta.env.VITE_BACKEND}/api/shop/profile/edit/${userId}`,formData)
    return response.data;
})

const profileSlice=createSlice({
    name:"profile",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchProfile.pending,(state)=>{
            state.isLoading=true
        }).addCase(fetchProfile.fulfilled,(state,action)=>{
            state.isLoading=false
            state.profileList=action?.payload?.data
        }).addCase(fetchProfile.rejected,(state)=>{
            state.isLoading=false
            state.profileList=[]
        })
        builder.addCase(editProfile.pending,(state)=>{
            state.isLoading=true
        }).addCase(editProfile.fulfilled,(state,action)=>{
            state.isLoading=false
            state.profileList=action?.payload?.data
        }).addCase(editProfile.rejected,(state)=>{
            state.isLoading=false
            state.profileList=[]
        })

    }
})


export default profileSlice.reducer;
