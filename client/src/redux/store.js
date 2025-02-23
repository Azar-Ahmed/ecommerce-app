import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import AdminProductSlice from './admin/product-slice'
import ProductSlice from './shop/product-slice'



const store = configureStore({
    reducer: {
      auth: authReducer,
      adminProduct: AdminProductSlice,
      shoppingProducts: ProductSlice,
    },
  });

  export default store;