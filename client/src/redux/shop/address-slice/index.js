import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'http://localhost:3000/api/shop/address'

const initialState = {
    addressList: [],
    isLoading: false,
  };

  export const addAddress = createAsyncThunk('address/addAddress', async (formData) => {
    const  response = await axios.post(`${url}/add`, formData);
    return response.data
  })


  export const fetchAddress = createAsyncThunk('address/fetchAddress', async (userId) => {
    const  response = await axios.get(`${url}/fetch/${userId}`);
    return response.data
  })

export const deleteAddress = createAsyncThunk('address/deleteAddress', async ({userId, addressId}) => {
    const  response = await axios.delete(`${url}/delete/${userId}/${addressId}`);
    return response?.data
  })



  export const updateAddress = createAsyncThunk('address/updateAddress', async ({userId, addressId, formData }) => {
    const  response = await axios.put(`${url}/update/${userId}/${addressId}`, formData);
    return response.data
  })


  const AddressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addAddress.pending, (state) => {
                       state.isLoading = true
                     })
                     .addCase(addAddress.fulfilled, (state) => {
                       state.isLoading = false
                     })
                     .addCase(addAddress.rejected, (state) => {
                       state.isLoading = false
                     })

                     .addCase(fetchAddress.pending, (state) => {
                        state.isLoading = true
                      })
                      .addCase(fetchAddress.fulfilled, (state, action) => {
                        state.isLoading = false
                        state.addressList = action.payload.data
                      })
                      .addCase(fetchAddress.rejected, (state) => {
                        state.isLoading = false
                        state.addressList = []
                      })
    }
})

  export default AddressSlice.reducer;