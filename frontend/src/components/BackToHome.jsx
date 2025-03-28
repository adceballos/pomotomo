import { useNavigate } from "react-router-dom";
import { useState } from "react"; // Import useState from React

function BackToHome() {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/");  
    };

    return (
        <button 
            onClick={goToHome}
            className="fixed bottom-5 left-5 bg-[#D5F0C0] text-black px-4 py-2 rounded-full shadow-md transition-all duration-200 transform hover:bg-[#abe8bd] hover:scale-105 hover:shadow-xl"        >
            ←
        </button>
    );
}

export default BackToHome;
