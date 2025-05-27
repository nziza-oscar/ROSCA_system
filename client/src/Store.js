import { configureStore } from '@reduxjs/toolkit';
// import {authSlice} from './reducers/index';
import  authSlice  from './reducers/users/authSlice';
import DepositSlice from './reducers/dashboard/DepositSlice';
import WithdrawalSlice from './reducers/dashboard/WithdrawalSlice';

const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        deposit: DepositSlice.reducer,
        withdrawals: WithdrawalSlice.reducer
       
    }
});

export default store;
