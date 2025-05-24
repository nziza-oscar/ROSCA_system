import { configureStore } from '@reduxjs/toolkit';
// import {authSlice} from './reducers/index';
import  authSlice  from './reducers/users/authSlice';
import categorySlice from './reducers/dashboard/CategorySlice';
import ProductsSlice from './reducers/dashboard/ProductsSlice';
import CartSlice from './reducers/dashboard/CartSlice';
import PaymentMethodSlice from './reducers/dashboard/PaymentMethodSlice';
import OrdersSlice from './reducers/dashboard/OrdersSlice';
const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        categories: categorySlice.reducer,
        products: ProductsSlice.reducer,
        cart: CartSlice.reducer,
        paymentMethods: PaymentMethodSlice.reducer,
        orders: OrdersSlice.reducer
    }
});

export default store;
