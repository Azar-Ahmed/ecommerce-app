import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'http://localhost:3000/api/shop/order'

const initialState = {
    approvalUrl: null,
    isLoading: false,
    orderId: null,
    orderList: [],
    orderDetails: null,

  };


  export const createOrder = createAsyncThunk('order/createOrder', async (orderData) => {
    const  response = await axios.post(`${url}/create`, orderData);
    return response.data
  })

  export const capturePayment = createAsyncThunk('order/capturePayment', async ({paymentId, payerId, orderId}) => {
    const  response = await axios.post(`${url}/capture`, {paymentId, payerId, orderId});
    return response.data
  })

  export const getAllOrdersByUser = createAsyncThunk('order/getAllOrdersByUser', async (userId) => {
    const  response = await axios.get(`${url}/list/${userId}`);
    return response.data
  })

  export const getOrderDetails = createAsyncThunk('order/getOrderDetails', async (id) => {
    const  response = await axios.get(`${url}/details/${id}`);
    return response.data
  })
  

  const OrderSlice = createSlice({
    name: 'shoppingOrder',
    initialState,
    reducers: {
      resetOrderDetails: (state) => {
          state.orderDetails = null
      }
    },
    extraReducers : (builder) => {
           builder.addCase(createOrder.pending, (state) => {
                        state.isLoading = true
                      })
                      .addCase(createOrder.fulfilled, (state, action) => {
                        state.isLoading = false
                        state.approvalUrl = action.payload.approvalUrl
                        state.orderId = action.payload.orderId
                        sessionStorage.setItem('currentOrderId', JSON.stringify(action.payload.orderId))
                      })
                      .addCase(createOrder.rejected, (state) => {
                        state.isLoading = false
                        state.approvalUrl = null
                        state.orderId = null
                      })

                      .addCase(getAllOrdersByUser.pending, (state) => {
                        state.isLoading = true
                      })
                      .addCase(getAllOrdersByUser.fulfilled, (state, action) => {
                        state.isLoading = false
                        state.orderList = action.payload.data
                       })
                      .addCase(getAllOrdersByUser.rejected, (state) => {
                        state.isLoading = false
                        state.orderList = []
                      })

                      .addCase(getOrderDetails.pending, (state) => {
                        state.isLoading = true
                      })
                      .addCase(getOrderDetails.fulfilled, (state, action) => {
                        state.isLoading = false
                        state.orderDetails = action.payload.data
                       })
                      .addCase(getOrderDetails.rejected, (state) => {
                        state.isLoading = false
                        state.orderList = null
                      })
            }

})

export const {resetOrderDetails} = OrderSlice.actions;

export default OrderSlice.reducer;

