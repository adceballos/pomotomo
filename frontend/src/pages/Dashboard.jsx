import React from 'react'
import Timer from '../components/Timer'
import Timer2 from '../components/Timer2'
import Button from '../components/Button'
import logo from "../assets/Logo.svg"
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Goals from '../components/Goals'

function Dashboard() {
  const navigate = useNavigate()

  const {user} = useSelector((state) => state.auth)

  // user can only access dashboard page if they are logged in
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <>
    <div className="flex flex-col min-h-screen text-black py-10 max-w-6xl mx-auto">
      <div className='flex items-start mt-4'>
        <img src={logo} alt='pomotomo logo' max-width='100%' height='100' width='180'/>
      </div>
      <div className="">
        <Timer2 />
      </div>
    </div>
    <div className="flex justify-center px-24">
        <div className="border-1 border-[#D5F0C0] w-full my-6 mb-18" />
    </div>
    <Goals />
    </>
  )
}

export default Dashboard