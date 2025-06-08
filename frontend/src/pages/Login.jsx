import {useState, useEffect} from 'react'
import {FaSign, FaSignInAlt} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'    // useSelector is used to select something from the state like isLoading or isError, useDispatch to dispatch function like register or reset
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset, getMe } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const {email, password} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    // reset the state after we check everything by dispatching the reset reducer from authSlice which just sets all these states back to false
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
  
    const userData = {
      email,
      password
    }
  
    try {
      await dispatch(login(userData)).unwrap()
      await dispatch(getMe()).unwrap()
      navigate('/')
    } catch (err) {

    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='min-h-screen'>
      <section className='flex flex-col justify-center items-center gap-y-2'>
        <h1 className='flex items-center gap-1 text-4xl md:text-6xl mt-16 py-4'>
          <FaSignInAlt /> Login
        </h1>
        <p className='text-xl md:text-3xl text-black mb-12'>
          Login and start studying
        </p>
      </section>

  <section className='flex items-center justify-center'>
  <form onSubmit={onSubmit} className="space-y-4 w-full max-w-md px-2">
      <div>
        <input
          type="email"
          className="w-full border-2 font-sans border-[#1c1b19] p-2 focus:outline-none bg-gray-200"
          id='email'
          name='email'
          value={email}
          placeholder='Enter your email'
          onChange={onChange}
        />
      </div>    
      <div>
        <input
          type="password"
          className="w-full border-2 font-sans border-[#1c1b19] p-2 focus:outline-none bg-gray-200"
          id='password'
          name='password'
          value={password}
          placeholder='Enter password'
          onChange={onChange}
        />
      </div>       
      <div>
        <button type='submit' className='w-full border-2 text-xl border-[#1c1b19] text-[#eee0b4] bg-[#6a512d] p-2 hover:bg-[#6e2e2b] hover:cursor-pointer transition-colors duration-200'>
          Submit
        </button>
      </div>       
    </form>
  </section>

    </div>
  )
}

export default Login