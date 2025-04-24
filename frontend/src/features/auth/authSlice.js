// AuthSlice manages the Redux state based on the results from AuthService and they work together to keep track of user authentication status

// createSlice creates a redux slice (state + reducers) in one place
// createAsyncThunk handles asynchronous actions like API calls
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
// authService handles HTTP requests to the backend (/register, /login, /logout)
import authService from './authService'

// get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

// set initial state of the slice
const initialState = {
    user: user ? user: null,    // if user was found in local storage, use it, otherwise return null
    isError: false,     // if an error occurs during an async action
    isSuccess: false,   // if an async action succeeds
    isLoading: false,   // while waiting for a response from an API
    message: ''     // holds error or success message
}

// register user
// createAsyncThunk defines a async action auth/register
// calls authService.register(user) to make a post request to register the user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)     // returning payload (response data) that comes back from register function on line 48
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

// get user
export const getMe = createAsyncThunk('auth/getMe', async (_, thunkAPI) => {
    try {
        const user = thunkAPI.getState().auth.user
        if (!user) throw new Error('User not authenticated')

        const token = user.token
        return await authService.getMe(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// logout user
export const logout = createAsyncThunk('auth/logout', async() => {
    await authService.logout()  // logout by removing user data from the backend and local storage
})

// creates the redux slice, which consists of the state (initialState) and the reducers that modify it
export const authSlice = createSlice({
    name: 'auth',   // the name of the slice is auth, useful for identifying and managing the state, becomes apart of the state object state.auth
    initialState,   // default state we defined above, used when the app first loads and has not interacted with Redux yet
    // Reducers are synchronous functions that directly modify the state based on dispatched actions 
    reducers: {
        // resets the state values to their defaults(initialState), useful when the user finishes an action like logging in or registering
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    // extraReducers handle asynchronous actions created with createAsyncThunk
    // They define how the state should change based on the lifecycle of the async action (pending, fulfilled, rejected).
    extraReducers: (builder) => {
        builder     // builder just allows adding multiple cases to the reducers
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
            .addCase(getMe.pending, (state) => {     // set state to loading when the login is fetching data
                state.isLoading = true
            })
            .addCase(getMe.fulfilled, (state, action) => {   // update state when login fetched data
                state.isLoading = false
                state.isSuccess = true
                state.user = {
                    ...action.payload,
                    token: state.user?.token    // preserve existing token
                }
            })
            .addCase(getMe.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    }
})

// reset can be dispatched from a component to reset the state
export const {reset} = authSlice.actions
// function that updates the state based on actions
export default authSlice.reducer