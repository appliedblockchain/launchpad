import { Button, TextField } from '@launchpad-ts/ui-library'
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
      <TextField
        label="Name"
        {...register('name')}
        error={errors?.name?.message}
      />
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
      <TextField
        label="Confirm password"
        {...register('confirmPassword')}
        type="password"
        error={errors?.confirmPassword?.message}
      />
      <div className="button-container">
        <Button type="submit">Register</Button>
        {authError && <span>{authError}</span>}
      </div>
    </form>
  )
}
export default RegisterForm
