import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { authService } from './auth.service'
import { RegisterFormData } from './types'
import { User } from '@launchpad-ts/shared-types'
import { RootState } from '../../store'

export const register = createAsyncThunk<
  void,
  RegisterFormData,
  { rejectValue: string }
>('auth/register', async ({ name, email, password }, thunkAPI) => {
  try {
    const response: AxiosResponse<any> = await authService.register({
      name,
      email,
      password,
    })

    if (response.status === 201) {
      thunkAPI.dispatch(login({ email, password }))
    } else {
      throw response.data
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data)
  }
})

export const login = createAsyncThunk<
  any,
  { email: string; password: string },
  { rejectValue: string }
>('auth/login', async ({ email, password }, thunkAPI) => {
  try {
    const { user } = await authService.login({ email, password })

    return { user }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data)
  }
})

interface AuthState {
  isLoggedIn: boolean
  user: null | User
  errorMessage: null | string
}
const user: null | User = authService.getUser()
const initialState: AuthState = { isLoggedIn: false, user, errorMessage: null }

export const logout = createAsyncThunk('auth/logout', async () => {
  authService.logout()
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.errorMessage = null
      })
      .addCase(login.pending, (state) => {
        state.errorMessage = null
      })
      .addCase(logout.pending, (state) => {
        state.errorMessage = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true
        state.user = action.payload.user
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoggedIn = false
        state.user = null
        state.errorMessage = payload as string
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.isLoggedIn = false
        state.user = null
        state.errorMessage = payload as string
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false
        state.user = null
      })
  },
})

const selectUser = (state: RootState) => state.auth.user
const selectAuthError = (state: RootState) => state.auth.errorMessage
export default authSlice.reducer

export { selectUser, selectAuthError }
