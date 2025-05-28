import { createSlice } from "@reduxjs/toolkit";
import { getAllUserBalances, WithdrawalAmount } from "../../actions/dashboard";


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







    .addCase(WithdrawalAmount.pending, (state)=>{
      state.loading = true
    })
    .addCase(WithdrawalAmount.fulfilled, (state,action)=>{
      state.loading = false
      state.usersBalance = state.usersBalance.map((withDrawal)=>withDrawal.user.id == action.payload.data.receiver ? {...withDrawal,totalWithdrawals: withDrawal.totalWithdrawals + action.payload.data.amount }: withDrawal)
     state.success = "Successfully withdrew "
    })
    .addCase(WithdrawalAmount.rejected, (state,action)=>{
      
      state.loading = false
      state.error = action.payload.message
    })



  }
})

export const {clearSuccessError} = WithdrawalSlice.actions
export default WithdrawalSlice
