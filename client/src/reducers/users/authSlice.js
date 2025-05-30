import { createSlice } from "@reduxjs/toolkit";
 
import { createUser, createUserAddressThunk, deleteUserAddressThunk, fetchMyData, fetchUsers, signIn, signUp, updateUserAddressThunk, updateUserInfoThunk, updateUserPasswordThunk } from "../../actions/users/index"


const handleAuthSuccess = (state, action) => {
  const data = action.payload.data.user
  state.loading = false;
  state.user = action.payload.data.user;
  state.token = action.payload.data.token;
  sessionStorage.setItem('nihemart_token', action.payload.data.token);
  state.error = null;
  
  window.location.href="/dashboard"
  
};

const handleAuthFailure = (state, action) => {
  state.loading = false;
  state.error = action.payload.message;
};



const authSlice = createSlice({
    name: 'auth',
    initialState: {
      user: null,
      token: sessionStorage.getItem('nihemart_token') || null,
      loading: false,
      error: null,
      users:[],
      success:null,
      ploading: false,
      perror:null,
      psuccess:null
    },
    reducers: {
      logout: (state) => {
        state.user = null;
        state.token = null;
        sessionStorage.removeItem('nihemart_token');
        window.location.href="/"
      },
      clearSuccessError(state){
        state.error = null;
        state.success = null
        state.perror = null
        state.psuccess = null
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(updateUserPasswordThunk.pending, (state)=>{
          state.ploading = true
        })
        .addCase(updateUserPasswordThunk.fulfilled, (state,action)=>{
          state.ploading = false
          state.perror = null
           state.psuccess = "Password successfully updated..."
        })
        .addCase(updateUserPasswordThunk.rejected, (state,action)=>{
          state.perror = action.payload.message
          state.ploading = false
        })
        .addCase(signIn.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(signIn.fulfilled,handleAuthSuccess)
        .addCase(signIn.rejected,handleAuthFailure)
        .addCase(signUp.pending,(state)=>{
          state.loading = true;
          state.error = null
        })
        .addCase(signUp.fulfilled,handleAuthSuccess)
        .addCase(signUp.rejected,handleAuthFailure)
        .addCase(fetchMyData.pending, (state)=>{
          state.loading = true
        })
        .addCase(fetchMyData.fulfilled,(state,action)=>{
          state.user = action.payload.data
          state.loading = false
        })
        .addCase(fetchMyData.rejected, (state,action)=>{
          state.loading = false
          state.error = action.payload.message
        })
        .addCase(createUser.fulfilled,(state,action)=>{
           state.users.push(action.payload.data)
        })
        .addCase(fetchUsers.fulfilled,(state,action)=>{
          state.users = action.payload.data
        })
        .addCase(updateUserInfoThunk.pending, (state)=>{
          state.loading = true
          state.success = null,
          state.error = null
        })
        .addCase(updateUserInfoThunk.fulfilled, (state, action)=>{
           state.user = action.payload.data.data
           state.success = action.payload.data.message
           state.loading = false
           state.error = null
          console.log(action.payload)
        })
        .addCase(updateUserInfoThunk.rejected, (state,action)=>{
          state.loading = false;
          state.error = action.payload.message 
     
        })
        // create user address
        .addCase(createUserAddressThunk.pending, (state)=>{
          state.loading = true,
          state.error = null

        })
        .addCase(createUserAddressThunk.fulfilled, (state,action)=>{
           state.user = action.payload.data
          console.log(action.payload)
           state.loading = false
           state.error = null
           state.success = "Successfully added new address"
        })
        .addCase(createUserAddressThunk.rejected, (state,action)=>{
          state.loading = false;
          state.error = action.payload.message
          state.success = null
        })
        // remove user address
        .addCase(deleteUserAddressThunk.pending, (state)=>{
          state.loading = true
          state.success = null;
          state.error = null
        })
        .addCase(deleteUserAddressThunk.fulfilled, (state, action)=>{
          state.user.address = state.user.address.filter((address)=> address._id.toString() !== action.payload.id.toString())
           state.success = action.payload.message
           state.loading = false
           state.error = null
        })
        .addCase(deleteUserAddressThunk.rejected, (state,action)=>{
          state.loading = false;
          state.error = action.payload.message
        })
        // update user address

        .addCase(updateUserAddressThunk.pending, (state)=>{
          state.loading = true;
          state.error = null;
          state.success = null
        })
        .addCase(updateUserAddressThunk.fulfilled, (state,action)=>{
          state.loading = false;
          state.success = "Updated successfull"
          state.user.address[action.payload.data.index] = action.payload.data.address

           console.log(action.payload)
        })
        .addCase(updateUserAddressThunk.rejected, (state,action)=>{
           state.error = action.payload.message
           state.success = null;
           state.loading = false
        })

       
    }
  });

  export const { logout, clearSuccessError } = authSlice.actions
  // export default authSlice.reducer
  export default authSlice