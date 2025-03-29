import Dashboard from './pages/Dashboard'
import About from './pages/About'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import TestTimer from './pages/TestTimer'

function App() {
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/test-timer" element={<TestTimer />} />
        </Routes>
      </div>
    </Router>
    <ToastContainer />
  </>  
  
  )
}

export default App
