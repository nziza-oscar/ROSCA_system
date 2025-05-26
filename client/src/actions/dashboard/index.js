import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../API/dashboardApi"

export const  fetchDeposits = createAsyncThunk("Deposit/list",
    async(_,thunkAPI)=>{
        try {
            const {data} = await API.fetchDeposits()
            return {status: "SUCCESS", data: data}
            
        } catch (error) {
            console.log(error, "ERRPR")
            return thunkAPI.rejectWithValue({
                status:"ERROR",
                message: error.response?.data?.message || "Fetching categories failed"
            })
        }
    }
)



export const  createDeposit = createAsyncThunk("Deposit/create",
    async(FormData,thunkAPI)=>{
        try {
            
            const {data} = await API.createDeposit(FormData)
            
            return {status: "SUCCESS", data: data}
        } catch (error) {
            return thunkAPI.rejectWithValue({
                status:"ERROR",
                message: error.response?.data?.message || "Fetching categories failed"
            })
        }
    }
)


export const  updateDeposit = createAsyncThunk("Deposit/update",
    async(info,thunkAPI)=>{
        try {
            const {data} = await API.updateDeposit(info)
            return {status: "SUCCESS", data: data}
        } catch (error) {
            return thunkAPI.rejectWithValue({
                status:"ERROR",
                message: error.response?.data?.message || "Fetching categories failed"
            })
        }
    }
)


export const  deleteDeposit = createAsyncThunk("Deposit/Delete",
    async(id,thunkAPI)=>{
        try {
            const {data} = await API.deleteDeposit(id)

            return {status: "SUCCESS", data: data}
        } catch (error) {
            return thunkAPI.rejectWithValue({
                status:"ERROR",
                message: error.response?.data?.message || "Deleting Deposit failed"
            })
        }
    }
)


export const  skippedDeposit = createAsyncThunk("Deposit/skipped",
    async(FormData,thunkAPI)=>{
        try {
            const {data} = await API.getSkippedDays(FormData.year,FormData.month)
            return {status: "SUCCESS", data: data}
        } catch (error) {
            return thunkAPI.rejectWithValue({
                status:"ERROR",
                message: error.response?.data?.message || "Failed to fetch skipped days"
            })
        }
    }
)



export const  getPendingDeposits = createAsyncThunk("Deposit/pending",
    async(FormData,thunkAPI)=>{
        try {
            const {data} = await API.getPendingDeposits(FormData.year,FormData.month)
            return {status: "SUCCESS", data: data}
        } catch (error) {
            return thunkAPI.rejectWithValue({
                status:"ERROR",
                message: error.response?.data?.message || "Failed to "
            })
        }
    }
)

