import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'http://localhost:3000/api/shop/products'

const initialState = {
    isLoading : false,
    productList : [],
    productDetails: null
}

export const fetchFilteredProducts = createAsyncThunk('/product/fetchFilteredProducts', async ({filterParams, sortParams}) => {
   const query = new URLSearchParams({...filterParams, sortBy: sortParams})
    const result = await axios.get(`${url}/fetch?${query}`)
   return result?.data
})

export const fetchProductDetails = createAsyncThunk('/product/fetchProductDetails', async (id) => {
     
    console.log('id' + id)
    const result = await axios.get(`${url}/fetch/${id}`)
    return result?.data;
 })


const ProductSlice = createSlice({
    name: 'shoppingProducts',
    initialState,
    reducers: {
        setProductDetails: (state) => {
            state.productDetails = null;
          },
    },
     extraReducers : (builder) => {
            builder.addCase(fetchFilteredProducts.pending, (state) => {
                state.isLoading = true
            }).addCase(fetchFilteredProducts.fulfilled, (state, action) => {
                state.isLoading = false,
                state.productList = action.payload.data
            }).addCase(fetchFilteredProducts.rejected, (state) => {
                state.isLoading = false,
                state.productList = []
            })

            .addCase(fetchProductDetails.pending, (state) => {
                state.isLoading = true
            }).addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.isLoading = false,
                state.productDetails = action.payload.data
            }).addCase(fetchProductDetails.rejected, (state) => {
                state.isLoading = false,
                state.productDetails = null
            })  
        }
})

export const { setProductDetails } = ProductSlice.actions;

export default ProductSlice.reducer;