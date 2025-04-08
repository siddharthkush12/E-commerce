import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  cartItems: [],
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    
    const response = await axios.post(
      "http://localhost:8000/api/shop/cart/add",
      { userId, productId, quantity }
    );
    return response?.data;
  }
);

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:8000/api/shop/cart/get/${userId}`
    );
    // console.log(response?.data);
    return response?.data;
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, quantity}) => {
    const response = await axios.put(
      "http://localhost:8000/api/shop/cart/updateCart",
      {userId, productId, quantity}
    );
    // console.log(response?.data);
    return response?.data; 
  }
);


export const deleteCartItems = createAsyncThunk(
  "cart/deleteCartItems",
  async ({ userId, productId}) => {
    const response = await axios.delete(
      `http://localhost:8000/api/shop/cart/${userId}/${productId}`
    );
    // console.log(response?.data);
    return response?.data; 
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
     
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItems = [];
      }).addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItems = [];
      }).addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
    
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItems = [];
      }).addCase(deleteCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItems.fulfilled, (state, action) => {
       
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.cartItems = [];
      })

  },
});

export default shoppingCartSlice.reducer;
