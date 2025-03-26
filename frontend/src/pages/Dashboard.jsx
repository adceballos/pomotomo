import React from 'react'
import Timer from '../components/Timer'
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
    <div className="flex flex-col justify-between min-h-screen bg-[#fd8989] text-black px-4 py-10">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-[VT323] text-center">Pomotomo!</h1>
      <div className='flex items-center justify-center mt-4'>
        <img src={logo} alt='pomotomo logo' max-width='100%' height='100' width='180'/>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <Timer />
      </div>

      <div className="flex justify-center gap-5 mb-12">
        <Button href="#list" text="Tasks" />
        <Button href="/about" text="About" />
      </div>

    </div>
    <div className="flex justify-center px-12 bg-[#fd8989]">
        <div className="border-t border-[#D5F0C0] w-full my-6 mb-18" />
    </div>
    <Goals />
    </>
  )
}

export default Dashboard