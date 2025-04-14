import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  wishlistProductList: [],
  
};

export const addWishlistProduct = createAsyncThunk(
  "/wishlist/add",
  async ({userId,productId}) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND}/api/shop/wishlist/add`,
      {userId,productId},
    );
    return response?.data;
  }
);

export const fetchWishlistProduct = createAsyncThunk("/shop/wishlist/fetchWishlistProduct", async (userId) => {

  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND}/api/shop/wishlist/get/${userId}`
  );
  // console.log(response?.data);
  return response?.data;
  
});

export const deleteWishlistProduct = createAsyncThunk("/shop/wishlist/deleteWishlistProduct", async ({userId,productId}) => {

  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND}/api/shop/wishlist/remove/${userId}/${productId}`,
    
  );
  // console.log(response?.data);
  return response?.data;
  
});


const wishlistProductSlice = createSlice({
  name: "wishlistProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addWishlistProduct.fulfilled, (state, action) => {
        // console.log(action.payload);

        state.isLoading = false;
        state.wishlistProductList=action.payload.wishlist;

      }).addCase(fetchWishlistProduct.pending, (state) => {
        state.isLoading = true;
      }).addCase(fetchWishlistProduct.fulfilled, (state, action) => {
        // console.log(action.payload.wishlist);
        state.isLoading = false;
        state.wishlistProductList = action.payload.wishlist.products;
      }).addCase(fetchWishlistProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.wishlistProductList = [];
      }).addCase(deleteWishlistProduct.pending, (state) => {
        state.isLoading = true;
      }).addCase(deleteWishlistProduct.fulfilled, (state, action) => {
        
        state.isLoading = false;
        state.wishlistProductList = action.payload.wishlist.products;
      }).addCase(deleteWishlistProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.wishlistProductList = [];
      })
      
  },
});

export default wishlistProductSlice.reducer;
