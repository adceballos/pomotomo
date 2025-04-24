import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import questService from './questService'

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const claimQuest = createAsyncThunk('quests/claim', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await questService.claimQuest(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const questSlice = createSlice({
    name: 'quests',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(claimQuest.pending, (state) => {
                state.isLoading = true
            })
            .addCase(claimQuest.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(claimQuest.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = questSlice.actions
export default questSlice.reducer