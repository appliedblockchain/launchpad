import { Button } from '@launchpad-ts/ui-library'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../../../store'
import { logout, selectUser } from '../../auth/auth.slice'

function HomePage() {
  const user = useSelector(selectUser)
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = async () => {
    const resultAction = await dispatch(logout())
    if (logout.fulfilled.match(resultAction)) {
      navigate('/login')
    }
  }

  return (
    <div className="page-container">
      <h2>Hello, {user?.name}</h2>
      <Button type="button" onClick={handleSubmit}>
        Logout
      </Button>
    </div>
  )
}
export default HomePage
