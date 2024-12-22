import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'

const store = configureStore({
    reducer: rootReducer,
    // Add middleware or other store enhancers if needed
})

export default store
