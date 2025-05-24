import { createSlice } from "@reduxjs/toolkit";
import {
  createPaymentMethod,
  deletePaymentMethod,
  updatePaymentMethod,
  fetchPaymentMethods,
} from "../../actions/dashboard";

const PaymentMethodSlice = createSlice({
  name: "payment",
  initialState: {
    paymentMethods: [],
    error: null,
    success: null,
    loading: false,
  },
  reducers: {
    clearSuccessError(state) {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchPaymentMethods.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPaymentMethods.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentMethods = action.payload.data;
      })
      .addCase(fetchPaymentMethods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // Create
      .addCase(createPaymentMethod.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPaymentMethod.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Payment method created successfully";
        state.paymentMethods.push(action.payload.data);
      })
      .addCase(createPaymentMethod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // Update
      .addCase(updatePaymentMethod.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePaymentMethod.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Payment method updated successfully";
        const index = state.paymentMethods.findIndex(
          (method) => method.id === action.payload.data.id
        );
        if (index !== -1) {
          state.paymentMethods[index] = action.payload.data;
        }
      })
      .addCase(updatePaymentMethod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // Delete
      .addCase(deletePaymentMethod.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePaymentMethod.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Payment method deleted successfully";
        state.paymentMethods = state.paymentMethods.filter(
          (method) => method._id !== action.payload._id
        );
      })
      .addCase(deletePaymentMethod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearSuccessError } = PaymentMethodSlice.actions;
export default PaymentMethodSlice;
