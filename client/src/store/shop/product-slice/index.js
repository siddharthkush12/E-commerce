import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails:null,

};


export const fetchFilteredProduct = createAsyncThunk("/shop/products/fetchFilteredProduct", async ({filterParam,sortParam}) => {

    const query=new URLSearchParams({
      ...filterParam,
      sortBy : sortParam
    })

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND}/api/shop/products/get?${query}`
    );
    return response?.data;

  });


export const fetchProductDetails = createAsyncThunk("/shop/products/fetchProductDetails", async (id) => {

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND}/api/shop/products/get/${id}`
    );
    return response?.data;

  });


const shopProductSlice = createSlice({
  name: "shoppingProduct",
  initialState,
  reducers: {
      clearProductDetails:(state)=>{
        state.productDetails=null;

    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilteredProduct.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchFilteredProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productList = action.payload.data;
          })
          .addCase(fetchFilteredProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.productList = [];
          }).addCase(fetchProductDetails.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchProductDetails.fulfilled, (state, action) => {
            // console.log(action.payload.data);
            
            state.isLoading = false;
            state.productDetails = action.payload.data;
          })
          .addCase(fetchProductDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.productDetails = null;
          });
  },
});

export default shopProductSlice.reducer;
export const { clearProductDetails } = shopProductSlice.actions;
