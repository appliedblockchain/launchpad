import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { selectUser } from './feature/auth/auth.slice'
import { LoginPage } from './feature/auth/login'
import { RegisterPage } from './feature/auth/register'
import { HomePage } from './feature/home/home-page'

function RequireAuth({ children }: { children: JSX.Element }) {
  const user = useSelector(selectUser)
  if (!user) {
    return <Navigate to="/login" />
  }
  return children
}
function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        }
      />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default Router
