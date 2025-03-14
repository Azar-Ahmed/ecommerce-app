import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'http://localhost:3000/api/auth'

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null
}

export const registerUser = createAsyncThunk('/auth/register', async(formData) => {
        const response = await axios.post(`${url}/register`, formData, {
            withCredentials: true
        })
        return response.data; 
    }
)

export const loginUser = createAsyncThunk('/auth/login', async(formData) => {
    const response = await axios.post(`${url}/login`, formData, {
        withCredentials: true
    })
    return response.data; 
}
)

export const checkAuthUser = createAsyncThunk(
    "/auth/check-auth",
  
    async () => {
      const response = await axios.get(`${url}/check-auth`,
        {
          withCredentials: true,
          headers: {
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        }
      );
  
      return response.data;
    }
  );

  export const logoutUser = createAsyncThunk(
    "/auth/logout",
  
    async () => {
      const response = await axios.post(
        `${url}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
  
      return response.data;
    }
  );
  

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setUser:() => {}
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true
        }).addCase(registerUser.fulfilled, (state) => {
            state.isLoading = false
            state.user = null
            state.isAuthenticated = false
        }).addCase(registerUser.rejected, (state) => {
            state.isLoading = false
            state.user = null
            state.isAuthenticated = false
        })

        .addCase(loginUser.pending, (state) => {
            state.isLoading = true
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload.success ? action.payload.user : null;
            state.isAuthenticated = action.payload.success  
        }).addCase(loginUser.rejected, (state) => {
            state.isLoading = false  
            state.user = null
            state.isAuthenticated = false
        })

        .addCase(checkAuthUser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(checkAuthUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.success ? action.payload.user : null;
            state.isAuthenticated = action.payload.success;
          })
          .addCase(checkAuthUser.rejected, (state) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
          })
          
          .addCase(logoutUser.fulfilled, (state) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
          });
    }
})

export const {setUser} = authSlice.actions;
export default authSlice.reducer;