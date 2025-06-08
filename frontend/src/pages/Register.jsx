import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'    // useSelector is used to select something from the state like isLoading or isError, useDispatch to dispatch function like register or reset
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {FaUser} from 'react-icons/fa'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
    // putting each field in a single state with type object
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    // destructure fields from formData by extracting values from the formData object and creates individual variables
    // this is the same as writing const name = formData.name; const email = formData.email; etc..
    const {name, email, password, password2} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/')
        }

        // reset the state after we check everything by dispatching the reset reducer from authSlice which just sets all these states back to false
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    // e is the event object passed when the user types
    // e.target is the specific input element the user typed into
    // e.target.name is the name of the input (name, email, password, etc..)
    // e.target.value is what the user typed into the input
    // ex: if we type "John" into the name input, e.target.name = "name", e.target.value = "John", and setFormData updates the state
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,   // keep existing state values
            [e.target.name]: e.target.value,    // update only the "name" value (name: 'John')
        }))
    }

    // prevents the browser's default form submission behavior (by default, forms will try to refresh the page when submitted, e.preventDefault() stops that)
    const onSubmit = (e) => {
        e.preventDefault()

        if (password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
                name, 
                email, 
                password,
            }

            dispatch(register(userData))
        }
    }

    if (isLoading) {
        return <Spinner />
    }

  return (
    <div className='min-h-screen'>
        <section className='flex flex-col justify-center items-center gap-y-2'>
            <h1 className='flex items-center gap-2 text-4xl md:text-6xl mt-16 py-4'>
                <FaUser /> Register
            </h1>
            <p className='text-xl md:text-3xl text-black mb-12'>
                Please create an account
            </p>
        </section>

        <section className='flex items-center justify-center'>
            <form onSubmit={onSubmit} className="space-y-4 w-full max-w-md px-2">
                <div>
                    <input
                        type="text" 
                        className="w-full font-sans border-2 border-[#1c1b19] p-2 focus:outline-none bg-gray-200"                        
                        id='name' 
                        name='name' 
                        value={name} 
                        placeholder='Enter your name' 
                        onChange={onChange}
                    />
                </div>    
                <div>
                    <input
                        type="email" 
                        className="w-full font-sans border-2 border-[#1c1b19] p-2 focus:outline-none bg-gray-200"                        
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
                        className="w-full font-sans border-2 border-[#1c1b19] p-2 focus:outline-none bg-gray-200"                        
                        id='password' 
                        name='password' 
                        value={password} 
                        placeholder='Enter password' 
                        onChange={onChange}
                    />
                </div>       
                <div>
                    <input
                        type="password" 
                        className="w-full font-sans border-2 border-[#1c1b19] p-2 focus:outline-none bg-gray-200"                        id='password2' 
                        name='password2' 
                        value={password2} 
                        placeholder='Confirm password' 
                        onChange={onChange}
                    />
                </div>
                <div>
                    <button type='submit' className='w-full text-xl border-2 border-[#1c1b19] text-[#eee0b4] bg-[#6a512d] p-2 hover:bg-[#6e2e2b] hover:cursor-pointer transition-colors duration-200'>Submit</button>
                </div>       
            </form>
        </section>
    </div>
    )
}
export default Register