import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

// get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

// set initial state of the slice
const initialState = {
    user: user ? user: null,    // if user was found in local storage, use it, otherwise return null
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)     // returning payload that comes back from register function on line 48
    } catch (error) {
        // if any of these errors exist they get put into message variable
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)    // pass in message as payload that comes from register in line 53
    }
})

// login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)     
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk('auth/logout', async() => {
    await authService.logout()
})

// creates the redux slice, which consists of the state (initialState) and the reducers that modify it
export const authSlice = createSlice({
    name: 'auth',   // the name of the slice is auth, useful for identifying and managing the state
    initialState,   // default state we defined above, used when the app first loads and has not interacted with Redux yet
    // reducers are synchronous functions that modify the state, here, reset is our one reducer
    reducers: {
        reset: (state) => {     // resets the state, useful when the user finishes an action like logging in or registering
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {     // set state to loading when the register is fetching data
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {   // update state when register fetched data
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {    // something goes wrong/fails to fetch data
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.pending, (state) => {     // set state to loading when the login is fetching data
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {   // update state when login fetched data
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    }
})

// allows us to bring the reset action to other components
export const {reset} = authSlice.actions
export default authSlice.reducer