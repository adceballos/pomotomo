import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'
import defaultPFP from '../assets/naruto-default-pfp.jpg'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <header className="flex items-center justify-between p-4 text-white border-b border-gray-300 bg-[#D5F0C0] w-full ">
            <div className='text-3xl text-black'>
                <Link to='/'>Pomotomo</Link>
            </div>
            <ul className='flex gap-4'>
                {user ? (
                    <div className='flex items-center gap-6'>
                        <li>
                            <Link to='/profile' className='flex items-center gap-2 text-xl text-black hover:underline'>
                                <img src={defaultPFP} className='w-8 h-8 rounded-full object-contain'/>
                                {user && user.name}
                            </Link>
                        </li>
                        <li>
                            <button onClick={onLogout} className='flex text-md items-center gap-1 bg-black text-white rounded-md p-2 hover:bg-white hover:text-black transition px-4'><FaSignOutAlt />Logout</button>
                        </li>
                    </div>
                ) : (
                    <>
                        <li>
                            <Link to='/login' className='flex items-center gap-1 text-xl text-black hover:underline'><FaSignInAlt />Login</Link>
                        </li>
                        <li>
                            <Link to='/register' className='flex items-center gap-1 text-xl text-black hover:underline'><FaUser />Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
  ) 
}
export default Header