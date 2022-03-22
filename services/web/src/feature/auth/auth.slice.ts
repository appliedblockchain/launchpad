import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginResponse, User } from '@launchpad-ts/shared-types'
import { RootState } from '../../store'

enum AppLocalStorage {
  USER = 'user',
  ACCESS_TOKEN = 'access_token',
}

interface AuthState {
  isLoggedIn: boolean
  user: null | User
  errorMessage: null | string
}

const getUser = (): User | null => {
  const storedUser = localStorage.getItem(AppLocalStorage.USER)
  const user: null | User = storedUser ? JSON.parse(storedUser) : null
  return user
}

const user: null | User = getUser()
const initialState: AuthState = { isLoggedIn: false, user, errorMessage: null }

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, accessToken } }: PayloadAction<LoginResponse>
    ) => {
      state.user = user
      state.isLoggedIn = true
      localStorage.setItem(AppLocalStorage.USER, JSON.stringify(user))
      localStorage.setItem(AppLocalStorage.ACCESS_TOKEN, accessToken)
    },
    logout: (state) => {
      ;(state.user = null), (state.isLoggedIn = false)
      localStorage.removeItem(AppLocalStorage.USER)
      localStorage.removeItem(AppLocalStorage.ACCESS_TOKEN)
    },
  },
})

const selectUser = (state: RootState) => state.auth.user
const selectAuthError = (state: RootState) => state.auth.errorMessage

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer

export { selectUser, selectAuthError }
