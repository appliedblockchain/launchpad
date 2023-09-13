import { configureStore, PreloadedState, combineReducers } from '@reduxjs/toolkit'
import api from './feature/auth/auth.service'
import authReducer from './feature/auth/auth.slice'

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof store.dispatch
