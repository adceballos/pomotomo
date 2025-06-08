import Dashboard from './pages/Dashboard'
import About from './pages/About'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import MusicPlayer from './components/MusicPlayer'
import {useSelector, useDispatch} from 'react-redux'
import Quests from './pages/Quests'
import Shop from './pages/Shop'
import { useEffect } from 'react'
import { getMe } from './features/auth/authSlice'
import Footer from "./components/Footer"

function App() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user?.token) {
      dispatch(getMe())
    }
  }, [dispatch])

  return (
  <>
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/quests" element={<Quests />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </Router>
    <ToastContainer />
  </>  
  
  )
}

export default App