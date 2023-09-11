import { useForm } from 'react-hook-form'
import { LoginFormData } from '../../types'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

const validationSchema = Yup.object()
  .shape({
    email: Yup.string().email().required(),
    password: Yup.string().required().min(6).max(100),
  })
  .required()

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void
  authError?: string
}
function LoginForm({ onSubmit, authError }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onBlur',
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Email"
        {...register('email')}
      />
      <input
        type="password"
        placeholder="Password"
        {...register('password')}
      />

      <div className="button-container">
        <input type="submit" value="Login"></input>
        {authError && <span>{authError}</span>}
      </div>
    </form>
  )
}
export default LoginForm
