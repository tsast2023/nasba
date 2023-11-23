import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  product: {},
  priceFilter: null,
  item_offset: 0,
  forcePage: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/product");
      return response.data;
    } catch (error) {
      throw Error("Error fetching products: " + error.message);
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    single_product: (state, { payload }) => {
      state.product = state.products
        .map((item) => item.product)
        .flat()
        .find((product) => product.id === payload);
    },
    specific_product: (state, { payload }) => {
      state.product = state.products
        .map((item) => item.product)
        .flat()
        .find((item) => item.id == payload);
    },
    add_item_offset: (state, { payload }) => {
      state.item_offset = payload;
    },
    add_force_page: (state, { payload }) => {
      state.forcePage = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        console.error("Error fetching products:", action.error.message);
      });
  },
});

export const {
  single_product,
  specific_product,
  add_force_page,
  add_item_offset,
} = productSlice.actions;
export const selectProducts = (state) => state.products.products;
export const selectProduct = (state) => state.products.product;
export default productSlice.reducer;
