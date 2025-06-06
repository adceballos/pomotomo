import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import timerService from './timerService'

const initialState = {
    timer: null,
    isRunning: false,
    elapsedTime: 0,
    elapsedTimeTotal: 0,
    elapsedTimePomodoro: 0,
    initialTime: 10000,
    currentTime: 10000,
    isPomodoro: true,
    pomodoroCount: 0,
    pomodoroCountTotal: 0,
    sessionsCompleted: 0,
    phaseSwitched: false,
    pomoTime: 10000,
    breakTime: 5000,
    longBreakTime: 15000,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Start timer
export const startTimer = createAsyncThunk('timer/start', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await timerService.startTimer(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

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
export const stopTimer = createAsyncThunk('timer/stop', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await timerService.stopTimer(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Reset timer
export const resetTimer = createAsyncThunk('timer/reset', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await timerService.resetTimer(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Full reset timer
export const fullResetTimer = createAsyncThunk('timer/fullReset', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await timerService.fullResetTimer(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Switch timer phase
export const switchPhase = createAsyncThunk('timer/switch', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await timerService.switchPhase(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// enable auto play
export const enableAutoPlay = createAsyncThunk('timer/auto', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await timerService.enableAutoPlay(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const setCustomTimes = createAsyncThunk('timer/custom-times', async (times, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await timerService.setCustomTimes(token, times)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})

export const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        reset: (state) => {
            state.timer = null
            state.isRunning = false
            state.elapsedTime = 0
            state.elapsedTimeTotal = 0
            state.elapsedTimePomodoro = 0
            state.initialTime = 10000
            state.currentTime = 10000
            state.pomodoroCount = 0
            state.pomodoroCountTotal = 0
            state.sessionsCompleted = 0
            state.isPomodoro = true
            state.phaseSwitched = false
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(startTimer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(startTimer.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isRunning = true
                state.timer = action.payload
            })
            .addCase(startTimer.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(stopTimer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(stopTimer.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isRunning = action.payload.isRunning
                state.elapsedTime = action.payload.elapsedTime
                state.elapsedTimeTotal = action.payload.elapsedTimeTotal
                state.elapsedTimePomodoro = action.payload.elapsedTimePomodoro
                state.currentTime = action.payload.currentTime
            })
            .addCase(stopTimer.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(resetTimer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(resetTimer.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isRunning = action.payload.isRunning
                state.elapsedTime = action.payload.elapsedTime
                state.elapsedTimeTotal = action.payload.elapsedTimeTotal
                state.elapsedTimePomodoro = action.payload.elapsedTimePomodoro
                state.isPomodoro = action.payload.isPomodoro
                state.pomodoroCount = action.payload.pomodoroCount
                state.pomodoroCountTotal = action.payload.pomodoroCountTotal
                state.initialTime = action.payload.initialTime
                state.currentTime = action.payload.currentTime
                state.autoPlayEnabled = action.payload.autoPlayEnabled
                state.pomoTime = action.payload.pomoTime
                state.breakTime = action.payload.breakTime
                state.longBreakTime = action.payload.longBreakTime
                state.sessionsCompleted = action.payload.sessionsCompleted
            })
            .addCase(resetTimer.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload;
            })
            .addCase(fullResetTimer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fullResetTimer.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isRunning = action.payload.isRunning
                state.elapsedTime = action.payload.elapsedTime
                state.elapsedTimeTotal = action.payload.elapsedTimeTotal
                state.elapsedTimePomodoro = action.payload.elapsedTimePomodoro
                state.isPomodoro = action.payload.isPomodoro
                state.pomodoroCount = action.payload.pomodoroCount
                state.pomodoroCountTotal = action.payload.pomodoroCountTotal
                state.initialTime = action.payload.initialTime
                state.currentTime = action.payload.currentTime
                state.pomoTime = action.payload.pomoTime
                state.breakTime = action.payload.breakTime
                state.longBreakTime = action.payload.longBreakTime
                state.sessionsCompleted = action.payload.sessionsCompleted
            })
            .addCase(fullResetTimer.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload;
            })
            .addCase(switchPhase.pending, (state) => {
                state.isLoading = true
            })
            .addCase(switchPhase.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.phaseSwitched = action.payload.phaseSwitched
            })
            .addCase(switchPhase.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(enableAutoPlay.pending, (state) => {
                state.isLoading = true
            })
            .addCase(enableAutoPlay.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.autoPlayEnabled = action.payload.autoPlayEnabled
            })
            .addCase(enableAutoPlay.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(setCustomTimes.pending, (state) => {
                state.isLoading = true
            })
            .addCase(setCustomTimes.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.pomoTime = action.payload.pomoTime
                state.breakTime = action.payload.breakTime
                state.longBreakTime = action.payload.longBreakTime
            })
            .addCase(setCustomTimes.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getTimer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTimer.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.timer = action.payload
                state.isRunning = action.payload.isRunning
                state.elapsedTime = action.payload.elapsedTime
                state.elapsedTimeTotal = action.payload.elapsedTimeTotal
                state.elapsedTimePomodoro = action.payload.elapsedTimePomodoro
                state.isPomodoro = action.payload.isPomodoro
                state.pomodoroCount = action.payload.pomodoroCount
                state.pomodoroCountTotal = action.payload.pomodoroCountTotal
                state.initialTime = action.payload.initialTime
                state.currentTime = action.payload.currentTime
                state.autoPlayEnabled = action.payload.autoPlayEnabled
                state.pomoTime = action.payload.pomoTime
                state.breakTime = action.payload.breakTime
                state.longBreakTime = action.payload.longBreakTime
                state.sessionsCompleted = action.payload.sessionsCompleted
            })
            .addCase(getTimer.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = timerSlice.actions
export default timerSlice.reducer
