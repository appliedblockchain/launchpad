import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../../../store'
import { login } from '../auth.slice'
import { LoginForm } from '../components/login-form'
import { LoginFormData } from '../types'

function LoginPage() {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = async (data: LoginFormData) => {
    const resultAction = await dispatch(login(data))
    if (login.fulfilled.match(resultAction)) {
      navigate('/', { replace: true })
    }
  }

  return (
    <div className="page-container">
      <LoginForm onSubmit={handleSubmit} />
    </div>
  )
}
export default LoginPage
