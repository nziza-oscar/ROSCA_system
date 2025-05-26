import { createSlice } from "@reduxjs/toolkit";
import { createDeposit, deleteDeposit, fetchDeposits, skippedDeposit } from "../../actions/dashboard";


const DepositSlice = createSlice({
  name:"Deposit",
  initialState:{
    data:[],
    loading:false,
    error:null,
    success:null,
    stats:null,
    debtsEvents:[]
  
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
    .addCase(fetchDeposits.pending, (state)=>{
      state.loading = true
    })
    .addCase(fetchDeposits.fulfilled, (state,action)=>{
      state.loading = false
      state.data = action.payload.data.deposits
      state.stats = action.payload.data.stats
    })
    .addCase(fetchDeposits.rejected, (state,action)=>{
      
      state.loading = false
    })
    .addCase(createDeposit.pending,(state)=>{
      state.loading = true
    })
    .addCase(createDeposit.fulfilled, (state,action)=>{
       state.loading = false;
       state.data.push(action.payload.data)
       state.success = "Deposited Successfully"
   
    })


    .addCase(deleteDeposit.pending, (state)=>{
      state.loading = false
      state.error = null
    })
    .addCase(deleteDeposit.fulfilled, (state,action)=>{
         state.data = state.data.filter((deposit)=> deposit._id !== action.payload.data.id)
         state.loading = null
         state.success = action.payload.data.message
    })
    .addCase(deleteDeposit.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload.message;

    })



    .addCase(skippedDeposit.pending, (state)=>{
      state.loading = true
    })
    .addCase(skippedDeposit.fulfilled, (state,action)=>{
      state.loading = false
      state.debtsEvents = action.payload.data
      console.log(action.payload.data)
    })
    .addCase(skippedDeposit.rejected, (state,action)=>{
      state.loading = false
      state.error = action.payload.message
    })




  }
})

export const {clearSuccessError} = DepositSlice.actions
export default DepositSlice
