import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../../../store'
import { useLoginMutation } from '../auth.service'
import { setCredentials } from '../auth.slice'
import { LoginForm } from '../components/login-form'
import { LoginFormData } from '../types'

function LoginPage() {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const [login, { error: authError }] = useLoginMutation()
  const handleSubmit = async (data: LoginFormData) => {
    const credentials = await login({
      email: data.email,
      password: data.password,
    }).unwrap()
    if (credentials) {
      dispatch(setCredentials(credentials))
      navigate('/')
    }
  }

  return (
    <div className="page-container">
      <LoginForm
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
export default LoginPage
