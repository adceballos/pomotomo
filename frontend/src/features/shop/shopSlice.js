import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import shopService from './shopService'

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const purchaseItem = createAsyncThunk(
  'shop/purchase',
  async (itemId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await shopService.purchaseItem(itemId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(purchaseItem.pending, (state) => {
        state.isLoading = true
      })
      .addCase(purchaseItem.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(purchaseItem.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = shopSlice.actions
export default shopSlice.reducer