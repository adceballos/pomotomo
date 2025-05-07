import { configureStore } from "@reduxjs/toolkit"
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'
import timerReducer from '../features/timer/timerSlice'
import questReducer from '../features/quests/questSlice'
import shopReducer from '../features/shop/shopSlice'

// configureStore creates the redux store and accepts reducer objects
// the reducer object defines different slices of our state
// ex: the key "auth" is the name of the state slice, and the value "authReducer" is the reducer function that will handle changes to that slice of state
export const store = configureStore({
    reducer: {
        auth: authReducer,
        goals: goalReducer,
        timer: timerReducer,
        quests: questReducer,
        shop: shopReducer,
    },
})