import React from "react";

export default function About(){
    return(
        <div id="about" className="flex flex-col items-center justify-center min-h-screen bg-[#7fafff] text-white">
            <h1 className="text-4xl font-bold mb-4">About Pomotomo</h1>
            <p> className="text-lg text-center max-w-2xl
                This Pomodoro study app helps users stay productive by managing tasks and using a built-in timer.
            </p>
        </div>
    );
}