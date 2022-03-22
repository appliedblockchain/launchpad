import { LoginResponse } from '@launchpad-ts/shared-types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LoginFormData, RegisterFormData } from './types'

const API_URL = process.env.REACT_APP_API_URL

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    register: builder.mutation<null, RegisterFormData>({
      query: (formData) => ({
        url: '/users',
        method: 'POST',
        body: formData,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginFormData>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation} = api
export default api;