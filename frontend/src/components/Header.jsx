import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'
import defaultPFP from '../assets/slum.PNG'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    const handleScrollToTasks = () => {
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
        <header className="grid grid-cols-3 items-center p-4 text-white border-b border-gray-300 bg-[#D5F0C0] w-full">
        <div className="flex items-center justify-start">
            <Link to="/" className="text-3xl text-black">
                Pomotomo!
            </Link>
        </div>

        <div className="flex items-center justify-center gap-8">
        {user ? (
            <>
                <button 
                    onClick={handleScrollToTasks}
                    className="text-xl text-black hover:underline"
                >
                    Tasks
                </button>
                <Link to="/about" className="text-xl text-black hover:underline">
                    About
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

        <div className="flex items-center justify-end gap-4">
            {user ? (
                <>
                    <Link to="/profile" className="flex items-center gap-2 text-xl text-black hover:underline">
                        <img src={defaultPFP} className="w-8 h-8 rounded-full object-contain" />
                        {user.name}
                    </Link>
                    <button
                        onClick={onLogout}
                        className="flex text-md items-center gap-1 bg-black text-white rounded-md p-2 hover:bg-white hover:text-black transition px-4"
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
    </header>
  ) 
}
export default Header