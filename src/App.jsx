import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage';
import UsersPage from './pages/UsersPage'
import EditPage from './pages/EditPage'

const App = () => {
  const isAuthenticated = localStorage.getItem('token')

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/users" element={isAuthenticated ? <UsersPage /> : <Navigate to="/" />} />
      <Route path="/edit/:id" element={isAuthenticated ? <EditPage /> : <Navigate to="/" />} />
    </Routes>
  )
}

export default App
