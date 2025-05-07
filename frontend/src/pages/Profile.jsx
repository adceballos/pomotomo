import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import slum from '../assets/slum.PNG'
import PfpSelector from '../components/PfpSelector'
import BackToHome from "../components/BackToHome.jsx"
import { getMe } from "../features/auth/authSlice.js"
import { getTimer } from '../features/timer/timerSlice'
import badge1 from "../assets/Ignition.gif"
import badge2 from "../assets/Endure_the_Fire.gif"
import badge3 from "../assets/The_Oath_Begins.gif"
import badge4 from "../assets/The_Disciplined.gif"
import badge5 from "../assets/Soul_of_the_Scholar.gif"
import { FaGear } from 'react-icons/fa6'

function Profile() {
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)
    const { pomodoroCountTotal, elapsedTimePomodoro } = useSelector((state) => state.timer)
    
    
    // State to store the selected profile picture
    const [selectedPfp, setSelectedPfp] = useState(slum); // Default to slum image

    const BADGES = {
        quest1: badge1,
        quest2: badge2,
        quest3: badge3,
        quest4: badge4,
        quest5: badge5,
    }

    // Function to handle image selection
    const handleImageSelect = (image) => {
        setSelectedPfp(image); // Update the profile picture
    }

    const log = user?.dailyStudyLog || {}

    const last7Days = [...Array(7)].map((_, i) => {
    const date = new Date(Date.now() - i * 86400000)
    const key = date.toLocaleDateString('en-CA')
    return {
        date: key,
        duration: log[key] || 0
    }
    }).reverse()

    const weeklyTotal = last7Days.reduce((sum, day) => sum + day.duration, 0)

    useEffect(() => {
    dispatch(getMe())
    dispatch(getTimer())
    }, [dispatch])
    
    return (
        <div className="flex flex-col min-h-screen text-black mx-auto max-w-4xl">
            <div className='flex border-4 border-[#6e2e2b] bg-gradient-to-r from-orange-100 via-orange-200 to-gray-100 w-full justify-center gap-x-6 h-80 max-h-80 mt-6 shadow-lg'>
                <div className='flex flex-shrink-0 mt-8'>
                    <img src={selectedPfp} className="w-auto h-48 md:h-64 rounded-full object-contain shadow-lg border-1"/>
                </div>
                <div className='flex flex-col items-start gap-y-4 mt-16'>
                    <div className='flex justify-between items-center w-full'>
                        <h1 className='text-5xl ml-4'>
                            {user.name}
                        </h1>
                        <h2 className='text-4xl'>
                            Lvl<span className='text-blue-400'> {user?.level}</span>
                        </h2>
                    </div>
                    <div className="bg-gray-100 p-4 pb-16 rounded-md max-w-lg w-lg h-39 ml-4 shadow-lg border-1 border-[#6e2e2b]">
                        <p className="break-all font-sans text-md">
                            bio
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col border-4 border-[#6e2e2b] bg-gradient-to-r from-orange-100 via-orange-200 to-gray-100 w-full h-60 max-h-60 mt-6 shadow-lg">
                <div className="bg-white h-12 flex items-center px-4 text-2xl tracking-wide border-b-2 border-[#6e2e2b]">
                    Badges
                </div>

                <div className="flex flex-1 gap-16 items-center justify-center">
                    {user?.questsCompleted?.map((questId) => {
                    const badge = BADGES[questId]
                    return badge ? (
                        <div key={questId}>
                        <img src={badge} alt={questId} className="w-32 h-auto" />
                        </div>
                    ) : null
                    })}
                </div>
            </div>

            <div className="flex flex-col border-4 border-[#6e2e2b] bg-gradient-to-r from-orange-100 via-orange-200 to-gray-100 w-full mt-6 shadow-lg">
                <div className="bg-white h-12 flex items-center px-4 text-2xl tracking-wide border-b-2 border-[#6e2e2b]">
                    Weekly Study Report (seconds)
                </div>

                <div className="grid grid-cols-7 gap-4 px-6 py-4 text-center text-black">
                    {last7Days.map(({ date, duration }) => (
                    <div key={date} className="bg-white rounded-lg p-3 shadow-md border border-[#6e2e2b]">
                        <div className="tagesschrift text-sm text-gray-500 mb-2">{date.slice(5)}</div>
                        <div className="tagesschrift text-xl text-[#6e2e2b]">
                        {Math.round(duration / 1000)} s
                        </div>
                    </div>
                    ))}
                </div>

                <div className="flex flex-col items-center justify-center py-5 space-y-4">
                    <p className="tagesschrift text-xl font-medium">Current Streak: <span className=" text-blue-700">{user?.streakCount || 0} days</span></p>
                    <p className="tagesschrift text-xl">Weekly Total: <span className=" text-green-700 font">{Math.round(weeklyTotal / 1000)} seconds</span></p>
                    <p className="tagesschrift text-xl">Lifetime Total: <span className=" text-purple-700">{Math.round(elapsedTimePomodoro / 1000)} seconds</span></p>
                    <p className="tagesschrift text-xl">Pomodoro Total: <span className=" text-red-700">{Math.round(pomodoroCountTotal)} phases</span></p>
                </div>
            </div>

            <div className="flex justify-center mt-8">
                <PfpSelector 
                    selectedPfp={selectedPfp} 
                    onImageSelect={handleImageSelect} 
                />
            </div>
            <BackToHome />
        </div>
    )
}
export default Profile

