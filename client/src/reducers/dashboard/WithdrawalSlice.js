import { createSlice } from "@reduxjs/toolkit";
import { getAllUserBalances } from "../../actions/dashboard";


const WithdrawalSlice = createSlice({
  name:"Deposit",
  initialState:{
    data:[],
    usersBalance:[],
    loading:false,
    error:null,
    success:null,
    
  },
  reducers:{
    clearSuccessError(state){
       state.error = null
       state.success = null
       state.loading = false
    }
  },

  extraReducers: (builder)=>{
    builder
    .addCase(getAllUserBalances.pending, (state)=>{
      state.loading = true
    })
    .addCase(getAllUserBalances.fulfilled, (state,action)=>{
      state.loading = false
      state.usersBalance = action.payload.data
    })
    .addCase(getAllUserBalances.rejected, (state,action)=>{
      
      state.loading = false
      state.error = action.payload.message
    })

  }
})

export const {clearSuccessError} = WithdrawalSlice.actions
export default WithdrawalSlice
