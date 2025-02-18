import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'http://localhost:3000/api/admin/products'

const initialState = {
    isLoading : false,
    productList : {}
}

export const addProduct = createAsyncThunk('/product/addProduct', async (formData) => {
    const result = await axios.post(`${url}/add`, formData, {
        headers:{
            'Content-Type': 'application/json',
        }
    })
    return result?.data
})

export const fetchProducts = createAsyncThunk('/product/fetchProducts', async () => {
    const result = await axios.get(`${url}/fetch`)
    return result?.data
})

export const editProduct = createAsyncThunk('/product/editProduct', async ({id, formData}) => {
    const result = await axios.put(`${url}/edit/${id}`, formData, {
        headers:{
            'Content-Type': 'application/json',
        }
    })
    return result?.data
})

export const deleteProduct = createAsyncThunk('/product/deleteProduct', async ({id}) => {
    const result = await axios.delete(`${url}/delete/${id}`)
    return result?.data
})

const AdminProductSlice = createSlice({
    name: 'adminProduct',
    initialState,
    reducers :{},
    extraReducers : (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false,
            state.productList = action.payload.data
        }).addCase(fetchProducts.rejected, (state) => {
            state.isLoading = false,
            state.productList = []
        })
    }
})

export default AdminProductSlice.reducer