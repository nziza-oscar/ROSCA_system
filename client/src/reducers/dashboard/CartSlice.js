import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCartThunk,
  addToCartThunk,
  updateCartItemThunk,
  deleteCartItemThunk,
  clearCartThunk
} from "../../actions/dashboard";

const CartSlice = createSlice({
  name: "shoppingcart",
  initialState: {
    error: null,
    loading: false,
    cart: {}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.data;
      })
      .addCase(fetchCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase(addToCartThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.data;
        // state.success = "Successfully add"
        alert("Successfully add to cart")
      })
      .addCase(addToCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase(updateCartItemThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartItemThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.data;
      })
      .addCase(updateCartItemThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase(deleteCartItemThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCartItemThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.data;
      })
      .addCase(deleteCartItemThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase(clearCartThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.data;
      })
      .addCase(clearCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  }
});

export default CartSlice;
