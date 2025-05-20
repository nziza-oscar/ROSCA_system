import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../API";

export const fetchMyData = createAsyncThunk("MYDATA",
    async (_,thunkAPI)=>{
        try {
            const res = await API.fetchMyData()
             
            return {status:"SUCCESS",data:res.data}
            
        } catch (error) {
            console.log(error.message)
            return thunkAPI.rejectWithValue({ status: 'ERROR', 
                message: error.response?.data?.message || 'Fetch My data failed' });
        }
    }
)


export const signIn = createAsyncThunk("AUTH",
    async (credentials,thunkAPI)=>{
        try {
            const res = await API.SignIn(credentials)
             
            return {status:"SUCCESS",message:'Redirecting',data:res.data}
            
        } catch (error) {
            // console.log(error)
            return thunkAPI.rejectWithValue({ status: 'ERROR', 
                message: error.response?.data?.message || 'Login failed' });
        }
    }
)


export const signUp = createAsyncThunk("AUTH/SIGNUP",
    async (credentials,thunkAPI)=>{
        try {
            const res = await API.SignUp(credentials)
             
            return {status:"SUCCESS",message:'Redirecting',data:res.data}
            
        } catch (error) {
            
            return thunkAPI.rejectWithValue({ status: 'ERROR', message: error.response?.data?.message || 'Login failed' });
        }
    }
)


// _______________________________________________USERS________________________________
export const createUser = createAsyncThunk("USERS/ADD",
    async (info,thunkAPI)=>{
        try {
            const res = await API.createUser(info)
             
            return {status:"SUCCESS",message:'Redirecting',data:res.data}
            
        } catch (error) {
            
            return thunkAPI.rejectWithValue({ status: 'ERROR', message: error.response?.data?.message || 'Failed to create user' });
        }
    }
)


// ___________get all users_________________



export const fetchUsers = createAsyncThunk("USERS/FETCH",
    async (_,thunkAPI)=>{
        try {
            const res = await API.fetchUsers()
             
            return {status:"SUCCESS",data:res.data}
            
        } catch (error) {
            
            return thunkAPI.rejectWithValue({ status: 'ERROR', message: error.response?.data?.message || 'Failed to fetch users' });
        }
    }
)


// ********** USER INFO *******************


export const updateUserInfoThunk = createAsyncThunk('USERS/update', async (info, thunkAPI) => {
    try {
      const response = await API.updateUserInfo(info);
     
      return { status: 'SUCCESS', data: response.data };
    } catch (error) {
  
      return thunkAPI.rejectWithValue({
        status: 'ERROR',
        message: error.response?.data?.message || 'Update user failed',
      });
    }
  });

  export const createUserAddressThunk = createAsyncThunk('USERS/address/create', async (info, thunkAPI) => {
    try {
      const response = await API.addUserAddress(info);
      return { status: 'SUCCESS', data: {...response.data} };
    } catch (error) {
        console.log(error)
      return thunkAPI.rejectWithValue({
        status: 'ERROR',
        message: error.response?.data?.message || 'Update user failed',
      });
    }
  });

  export const updateUserAddressThunk = createAsyncThunk('USERS/address/update', async (info, thunkAPI) => {
    try {
      const response = await API.updateUserAddress(info);

      return { status: 'SUCCESS', data: {...response.data} };
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: 'ERROR',
        message: error.response?.data?.message || 'Update user failed',
      });
    }
  });


  export const deleteUserAddressThunk = createAsyncThunk('USERS/address/delete', async (id, thunkAPI) => {
    try {
      const response = await API.removeAddress(id);

      return { status: 'SUCCESS', ...response.data };
    } catch (error) {
    
      return thunkAPI.rejectWithValue({
        status: 'ERROR',
        message: error.response?.data?.message || 'delete failed',
      });
    }
  });

  