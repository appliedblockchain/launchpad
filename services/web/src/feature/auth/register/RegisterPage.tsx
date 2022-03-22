import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../../../store'
import { RegisterFormData } from '../types'
import { RegisterForm } from '../components/register-form'
import { useLoginMutation, useRegisterMutation } from '../auth.service'
import { setCredentials } from '../auth.slice'

function RegisterPage() {
  const [register, { error: authError }] = useRegisterMutation()
  const [login] = useLoginMutation()
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (data: RegisterFormData) => {
    await register(data)
    const credentials = await login({
      email: data.email,
      password: data.password,
    }).unwrap()
    dispatch(setCredentials(credentials))
    navigate('/')
  }
  return (
    <div className="page-container">
      <RegisterForm
        onSubmit={handleSubmit}
        authError={
          authError && 'data' in authError
            ? (authError.data as string)
            : undefined
        }
      />
    </div>
  )
}
export default RegisterPage
