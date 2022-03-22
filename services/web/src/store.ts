import { configureStore } from '@reduxjs/toolkit'
import api from './feature/auth/auth.service'
import authReducer from './feature/auth/auth.slice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
