import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import AdminProductSlice from './admin/product-slice'


const store = configureStore({
    reducer: {
      auth: authReducer,
      adminProduct: AdminProductSlice,
   
    },
  });

  export default store;