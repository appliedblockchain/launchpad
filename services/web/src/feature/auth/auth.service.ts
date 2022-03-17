import axios from 'axios'
import { LoginFormData, RegisterFormData } from './types'

const API_URL = 'http://localhost:4000'

const register = ({ name, email, password }: RegisterFormData) => {
  return axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
  })
}

const login = ({ email, password }: LoginFormData) => {
  return axios
    .post(`${API_URL}/login`, {
      email,
      password,
    })
    .then(({ data }) => {
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('access_token', data.accessToken)
      return data
    })
}

const logout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('access_token')
}

export const authService = {
  register,
  login,
  logout,
}
