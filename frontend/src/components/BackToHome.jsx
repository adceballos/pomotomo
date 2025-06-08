import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa';

function BackToHome() {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/");  
    };

    return (
        <button 
            onClick={goToHome}
            className="hidden md:block fixed font-sans bottom-5 left-5 bg-[#6e2e2b] text-black px-4 py-3 rounded-full shadow-md transition-all duration-200 transform hover:bg-[#e9cac8] hover:shadow-xl">
            <FaArrowLeft />
        </button>
    );
}

export default BackToHome;
