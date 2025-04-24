import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import slum from '../assets/slum.PNG'
import PfpSelector from '../components/PfpSelector'
import BackToHome from "../components/BackToHome.jsx"
import { getMe } from "../features/auth/authSlice.js"
import badge1 from "../assets/Ignition.gif"
import badge2 from "../assets/Endure_the_Fire.gif"
import badge3 from "../assets/The_Oath_Begins.gif"
import badge4 from "../assets/The_Disciplined.gif"
import badge5 from "../assets/Soul_of_the_Scholar.gif"

function Profile() {
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)
    
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

    useEffect(() => {
    dispatch(getMe())
    console.log(user?.level)
    }, [dispatch])
    
    return (
        <div className="flex flex-col min-h-screen text-black mx-auto max-w-4xl">
            <div className='flex bg-gradient-to-r from-orange-100 via-orange-200 to-gray-100 w-full justify-center gap-x-6 h-80 max-h-80 mt-6 shadow-lg'>
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
                    <div className="bg-gray-100 p-4 pb-16 rounded-md max-w-lg w-lg h-39 ml-4 shadow-lg border-1">
                        <p className="break-all font-sans text-md">
                            bio
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col bg-gradient-to-r from-orange-100 via-orange-200 to-gray-100 w-full h-60 max-h-60 mt-6 shadow-lg">
                <div className="bg-white h-12 max-h-12 flex items-center py-2 px-2 text-xl">
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

