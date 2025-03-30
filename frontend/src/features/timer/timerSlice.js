import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import timerService from './timerService';

const initialState = {
    timer: null,
    isRunning: false,
    elapsedTime: 0,
    elapsedTimeTotal: 0,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Start timer
export const startTimer = createAsyncThunk('timer/start', async (timerData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await timerService.startTimer(timerData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// get timer
export const getTimer = createAsyncThunk('timer/getTimer', async (_, thunkAPI) => {
    try {
        const user = thunkAPI.getState().auth.user
        if (!user) throw new Error('User not authenticated')

        const token = user.token
        return await timerService.getTimer(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Stop timer
export const stopTimer = createAsyncThunk('timer/stop', async (timerData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await timerService.stopTimer(timerData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        reset: (state) => {
            state.timer = null;
            state.isRunning = false;
            state.elapsedTime = 0;
            state.elapsedTimeTotal = 0;
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(startTimer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(startTimer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isRunning = action.payload.isRunning;
                state.timer = action.payload;
            })
            .addCase(startTimer.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(stopTimer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(stopTimer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isRunning = action.payload.isRunning;
                state.elapsedTime = action.payload.elapsedTime;
                state.elapsedTimeTotal = action.payload.elapsedTimeTotal;
            })
            .addCase(stopTimer.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getTimer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTimer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.timer = action.payload
                state.isRunning = action.payload.isRunning;
                state.elapsedTimeTotal = action.payload.elapsedTimeTotal;
            })
            .addCase(getTimer.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    },
});

export const { reset } = timerSlice.actions;
export default timerSlice.reducer;
