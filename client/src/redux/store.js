import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import AdminProductSlice from './admin/product-slice'
import ProductSlice from './shop/product-slice'
import CartSlice from './shop/cart-slice'
import AddressSlice from './shop/address-slice'





const store = configureStore({
    reducer: {
      auth: authReducer,
      adminProduct: AdminProductSlice,
      shoppingProducts: ProductSlice,
      shoppingCart: CartSlice,
      shoppingAddress: AddressSlice
    },
  });

  export default store;