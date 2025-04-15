import BackToHome from "../components/BackToHome.jsx";

function About() {
    return (
        <>
            <div className="flex flex-col min-h-screen mt-12 text-black bg-checkerboard px-4 py-10">
                <BackToHome />
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center">
                    About the Pomodoro Technique
                </h1>
                
                <div className="max-w-2xl mx-auto text-2xl mt-12">
                <h2 className="text-4xl font-semi-bold text-[#183315] mb-2">What is it?</h2>
                    <p className="font-sans">
                        The Pomodoro Technique is a time management method that helps you focus and boost productivity 
                        by breaking work into intervals, traditionally 25 minutes in length, separated by short breaks.
                    </p>

                    <h2 className="text-4xl font-semi-bold text-[#183315] mt-12 mb-2">How it works</h2>
                    <ol className="font-sans list-decimal list-inside space-y-2">
                        <li>Choose a task you want to work on</li>
                        <li>Set a timer for 25 minutes and focus on the task</li>
                        <li>When the timer rings, take a 5-minute break</li>
                        <li>Repeat the cycle four times, then take a longer break (15-30 minutes)</li>
                    </ol>

                    <h2 className="text-4xl font-semi-bold text-[#183315] mt-12 mb-2">Why it's effective</h2>
                    <ul className="font-sans *:list-disc list-inside space-y-2">
                        <li>Reduces procrastination and distractions</li>
                        <li>Helps improve time estimation skills</li>
                        <li>Enhances focus and deep work</li>
                        <li>Prevents burnout by scheduling breaks</li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default About