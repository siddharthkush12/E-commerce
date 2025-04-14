import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/add",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND}/api/admin/products/add`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  }
);

export const fetchProduct = createAsyncThunk("/products/get", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND}/api/admin/products/get`
  );
  return response?.data;
});

export const editProduct = createAsyncThunk(
  "/products/edit",
  async ({ id, formData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND}/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/delete",
  async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND}/api/admin/products/delete/${id}`
    );
    return response?.data;
  }
);

const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        // console.log(action.payload.data);
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default adminProductSlice.reducer;
