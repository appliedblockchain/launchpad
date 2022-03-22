import { Button, TextField } from '@launchpad-ts/ui-library'
import { useForm } from 'react-hook-form'
import { LoginFormData } from '../../types'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { selectAuthError } from '../../auth.slice'

const validationSchema = Yup.object()
  .shape({
    email: Yup.string().email().required(),
    password: Yup.string().required().min(6).max(100),
  })
  .required()

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void
}
function LoginForm({ onSubmit }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onBlur',
  })

  const authError = useSelector(selectAuthError)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>
      <TextField
        label="Email"
        {...register('email')}
        error={errors?.email?.message}
      />
      <TextField
        label="Password"
        {...register('password')}
        type="password"
        error={errors?.password?.message}
      />

      <div className="button-container">
        <Button type="submit">Login</Button>
        {authError && <span>{authError}</span>}
      </div>
    </form>
  )
}
export default LoginForm