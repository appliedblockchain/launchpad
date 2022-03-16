import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { authService } from './auth.service'
import { RegisterFormData } from './types'
import { User } from '@launchpad-ts/shared-types'

export const register = createAsyncThunk<void, RegisterFormData>(
  'auth/register',
  async ({ name, email, password }, thunkAPI) => {
    try {
      const response: AxiosResponse<any> = await authService.register({
        name,
        email,
        password,
      })

      if (response.status === 201) {
        // thunkAPI.dispatch(login({ email, password }))
      } else {
        throw response.data
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const login = createAsyncThunk<any, { email: string; password: string }>(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const { user, accessToken } = await authService.login({ email, password })

      return { user }
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

interface AuthState {
  isLoggedIn: boolean
  user: null | User
}
const initialState: AuthState = { isLoggedIn: false, user: null }

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state) => {
        state.isLoggedIn = false
      })
      .addCase(register.rejected, (state) => {
        state.isLoggedIn = false
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true
        state.user = action.payload.user
      })
      .addCase(login.rejected, (state) => {
        state.isLoggedIn = false
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false
        state.user = null
      })
  },
})

export default authSlice.reducer
