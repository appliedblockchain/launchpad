import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../../../store'
import { logout, selectUser } from '../../auth/auth.slice'

function HomePage() {
  const user = useSelector(selectUser)
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = async () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className="page-container">
      <h2>Hello, {user?.name}</h2>
      <button onClick={handleSubmit}>
        Logout
      </button>
    </div>
  )
}
export default HomePage
