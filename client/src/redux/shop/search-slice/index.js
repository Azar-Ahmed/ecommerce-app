import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'http://localhost:3000/api/shop/search'

const initialState = {
    isLoading : false,
    searchResults: [],
}

export const getSearchResults = createAsyncThunk('/product/getSearchResults', async (keyword) => {
    const result = await axios.get(`${url}/${keyword}`)
    return result?.data;
 })

 
 const searchSlice = createSlice({
     name: 'searchSlice',
     initialState,
     reducers: {
        resetSearchResults: (state) => {
            state.searchResults = [];
          },
     },
      extraReducers : (builder) => {
             builder.addCase(getSearchResults.pending, (state) => {
                 state.isLoading = true
             }).addCase(getSearchResults.fulfilled, (state, action) => {
                 state.isLoading = false,
                 state.searchResults = action.payload.data
             }).addCase(getSearchResults.rejected, (state) => {
                 state.isLoading = false,
                 state.searchResults = []
             })

         }
 })
 
 
export const { resetSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
