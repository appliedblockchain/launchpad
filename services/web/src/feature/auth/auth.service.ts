import { User } from '@launchpad-ts/shared-types'
import axios from 'axios'
import { LoginFormData, RegisterFormData } from './types'

const API_URL = process.env.REACT_APP_API_URL

enum AppLocalStorage {
  USER = 'user',
  ACCESS_TOKEN = 'access_token',
}

const api = axios.create({
  baseURL: API_URL,
})

const register = ({ name, email, password }: RegisterFormData) => {
  return api.post('/register', {
    name,
    email,
    password,
  })
}

const login = ({ email, password }: LoginFormData) => {
  return api
    .post('/login', {
      email,
      password,
    })
    .then(({ data }) => {
      localStorage.setItem(AppLocalStorage.USER, JSON.stringify(data.user))
      localStorage.setItem(AppLocalStorage.ACCESS_TOKEN, data.accessToken)
      return data
    })
}

const getUser = (): User | null => {
  const storedUser = localStorage.getItem(AppLocalStorage.USER)
  const user: null | User = storedUser ? JSON.parse(storedUser) : null
  return user
}
const logout = () => {
  localStorage.removeItem(AppLocalStorage.USER)
  localStorage.removeItem(AppLocalStorage.ACCESS_TOKEN)
}

export const authService = {
  register,
  login,
  logout,
  getUser,
}
