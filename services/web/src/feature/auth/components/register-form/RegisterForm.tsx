import { useForm } from 'react-hook-form'
import { RegisterFormData } from '../../types'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

const validationSchema = Yup.object()
  .shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(6).max(100),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password')],
      'passwords must match'
    ),
  })
  .required()

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void
  authError?: string
}
function RegisterForm({ onSubmit, authError }: RegisterFormProps) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onBlur',
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Name"
        {...register('name')}
      />
      <input
        type="text"
        placeholder="Email"
        {...register('email')}
      />
      <input
        type="text"
        placeholder="Password"
        {...register('password')}
        type="password"
      />
      <input
        type="text"
        placeholder="Confirm password"
        {...register('confirmPassword')}
        type="password"
      />
      <div className="button-container">
        <input type="submit" value="Register"></input>
        {authError && <span>{authError}</span>}
      </div>
    </form>
  )
}
export default RegisterForm
