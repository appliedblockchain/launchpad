import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../../../store'
import { register } from '../auth.slice'
import { RegisterFormData } from '../types'
import { RegisterForm } from '../components/register-form'

function RegisterPage() {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (data: RegisterFormData) => {
    const resultAction = await dispatch(register(data))
    if (register.fulfilled.match(resultAction)) {
      navigate('/', { replace: true })
    }
  }

  return (
    <div className="page-container">
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  )
}
export default RegisterPage
