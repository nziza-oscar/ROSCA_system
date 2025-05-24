import { createSlice } from "@reduxjs/toolkit";
import { getOrders } from "../../actions/dashboard";


const OrdersSlice = createSlice({
    name:"orders",
    initialState:{
        data:[],
        success:null,
        error:null,
        loading: false
    },
    reducers:{

    },
    extraReducers: (builder)=>{
        builder.addCase(getOrders.pending, (state)=>{
             state.loading = true
        })
        .addCase(getOrders.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload.data
        })
        .addCase(getOrders.rejected, (state,action)=>{
            state.loading = false
            state.error = action.payload.message
        })
    }
})

export default OrdersSlice