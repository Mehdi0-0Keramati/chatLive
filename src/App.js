import { BrowserRouter, Route, Routes, Navigate, HashRouter } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import Home from "./Components/pages/Home"
import Login from "./Components/pages/Login"
import Register from "./Components/pages/Register"
import "./style.scss"
const App = () => {
  const { currentUser } = useContext(AuthContext)

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/Login" />
    }
    return children
  }

  return (
    <AuthContext.Provider value={{ currentUser: currentUser }}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to='/home' />} />
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </HashRouter>
    </AuthContext.Provider>
  )
}

export default App