import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import AdminProductSlice from './admin/product-slice'
import adminOrderSlice from './admin/order-slice'
import ProductSlice from './shop/product-slice'
import CartSlice from './shop/cart-slice'
import AddressSlice from './shop/address-slice'
import OrderSlice from './shop/order-slice'
import SearchSlice from './shop/search-slice'

const store = configureStore({
    reducer: {
      auth: authReducer,
      adminProduct: AdminProductSlice,
      adminOrder : adminOrderSlice,
      
      shoppingProducts: ProductSlice,
      shoppingCart: CartSlice,
      shoppingAddress: AddressSlice,
      shoppingOrder: OrderSlice,
      shoppingSearch: SearchSlice,
    },
  });

  export default store;