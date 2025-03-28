import { useState } from 'react';
import {useSelector} from 'react-redux'
import slum from '../assets/slum.PNG'
import PfpSelector from '../components/PfpSelector'
import BackToHome from "../components/BackToHome.jsx";

function Profile() {

    const {user} = useSelector((state) => state.auth)
    
    // State to store the selected profile picture
    const [selectedPfp, setSelectedPfp] = useState(slum); // Default to slum image

    // Function to handle image selection
    const handleImageSelect = (image) => {
        setSelectedPfp(image); // Update the profile picture
    }
    
    return (
        <div className="flex flex-col min-h-screen text-black mx-auto max-w-4xl">
            <div className='flex bg-gradient-to-r from-orange-100 via-orange-200 to-gray-100 w-full justify-center gap-x-6 h-80 max-h-80 mt-6'>
                <div className='flex flex-shrink-0 mt-8'>
                    <img src={selectedPfp} className="w-auto h-48 md:h-64 rounded-full object-contain shadow-lg border-1"/>
                </div>
                <div className='flex flex-col items-start gap-y-4 mt-16'>
                    <div className='flex justify-between items-center w-full'>
                        <h1 className='text-5xl ml-4'>
                            {user.name}
                        </h1>
                        <h2 className='text-4xl'>
                            Lvl<span className='text-blue-400'> 1</span>
                        </h2>
                    </div>
                    <div className="bg-gray-100 p-4 pb-16 rounded-md max-w-lg w-lg h-39 ml-4 shadow-lg border-1">
                        <p className="break-all font-sans text-md">
                            bio
                        </p>
                    </div>
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

