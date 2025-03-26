import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';

// configureStore creates the redux store and accepts reducer objects
// the reducer object defines different slices of our state
// ex: the key "auth" is the name of the state slice, and the value "authReducer" is the reducer function that will handle changes to that slice of state
export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
})