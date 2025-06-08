import {FaSignInAlt, FaSignOutAlt, FaUser, FaBars, FaTimes } from 'react-icons/fa'
import {Link, useNavigate, useLocation } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'
import { PFP_IMAGES } from '../utils/pfpMap'
import { useState } from 'react'

function Header() {
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        setMenuOpen(false)
        navigate('/')
    }

    const handleScrollToTasks = () => {
        setMenuOpen(false)
        if (location.pathname === '/') {
            // If already on the dashboard, just scroll down
            document.getElementById('tasks')?.scrollIntoView({ behavior: 'smooth' })
        } else {
            // If not on the dashboard, navigate and then scroll after render
            navigate('/');
            setTimeout(() => {
                document.getElementById('tasks')?.scrollIntoView({ behavior: 'smooth' })
            }, 200) // Small delay to allow the page to load first
        }
    }

    return (
        <header className="relative bg-[#eee0b4] bg-[url('/textures/cream-pixels.png')] py-2 bg-repeat border-b-4 border-[#6e2e2b] shadow-lg w-full text-black">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-2">
            <Link to="/" className="text-xl md:text-3xl text-black">
                Pomotomo!
            </Link>

        <div className="hidden md:flex items-center space-x-8">
        {user ? (
            <>
                <button 
                    onClick={handleScrollToTasks}
                    className="text-xl text-black hover:underline hover:cursor-pointer"
                >
                    Tasks
                </button>
                <Link to="/about" className="text-xl text-black hover:underline">
                    About
                </Link>
                <Link to="/quests" className="text-xl text-black hover:underline">
                    Quests
                </Link>
                <Link to="/shop" className="text-xl text-black hover:underline">
                    Shop
                </Link>
            </>
            ) : (
            <>
                <Link to="/about" className="text-xl text-black hover:underline">
                    About
                </Link>
            </>
            )
        }
        </div>

        <div className="hidden md:flex items-center justify-end gap-4">
            {user ? (
                <>
                    <Link to="/profile" className="flex items-center gap-2 text-xl text-black hover:underline">
                        <img src={PFP_IMAGES[user?.selectedPfp] || PFP_IMAGES.slum} className="w-8 h-8 rounded-full object-contain" alt="Profile Picture"/>
                        {user.name}
                    </Link>
                    <button
                        onClick={onLogout}
                        className="flex text-md items-center gap-1 p-2 px-3 border-2 hover:cursor-pointer border-[#1c1b19] text-[#eee0b4] bg-[#6a512d] hover:bg-[#6e2e2b] transition-colors duration-200"
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>
                </>
                ) : (
                <>
                    <Link to="/login" className="flex items-center gap-1 text-xl text-black hover:underline">
                        <FaSignInAlt />
                        Login
                    </Link>
                    <Link to="/register" className="flex items-center gap-1 text-xl text-black hover:underline">
                        <FaUser />
                        Register
                    </Link>
                </>
                )
            }
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

    {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#eee0b4] border-t-4 border-[#6e2e2b] shadow-lg z-50">
          <div className="flex flex-col p-4 space-y-4">
            {user ? (
              <>
                <button onClick={handleScrollToTasks} className="text-left hover:underline">
                  Tasks
                </button>
                <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:underline">
                  About
                </Link>
                <Link to="/quests" onClick={() => setMenuOpen(false)} className="hover:underline">
                  Quests
                </Link>
                <Link to="/shop" onClick={() => setMenuOpen(false)} className="hover:underline">
                  Shop
                </Link>
                <div className="border-t pt-4 flex flex-col space-y-2">
                  <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:underline">
                    <img
                      src={PFP_IMAGES[user.selectedPfp] || PFP_IMAGES.slum}
                      className="w-8 h-8 rounded-full"
                      alt="PFP"
                    />
                    {user.name}
                  </Link>
                  <button onClick={onLogout} className="flex items-center gap-1 hover:underline">
                    <FaSignOutAlt />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:underline">
                  About
                </Link>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="flex items-center gap-1 hover:underline">
                  <FaSignInAlt /> Login
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="flex items-center gap-1 hover:underline">
                  <FaUser /> Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  ) 
}

export default Header