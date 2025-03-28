import BackToHome from "../components/BackToHome.jsx";
export default function About() {
    return (
        <>
            <div className="relative flex flex-col justify-between min-h-screen bg-[#ee906b] text-white px-4 py-20" id="about">
                <BackToHome />
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-[VT323] text-center">
                    About the Pomodoro Technique
                </h1>
                
                <div className="max-w-2xl mx-auto text-xl leading-relaxed space-y-6 py-12">
                    <p>
                        The <span className="text-[#abe8bd]">Pomodoro Technique</span> is a time management method that helps you focus and boost productivity 
                        by breaking work into intervals, traditionally 25 minutes in length, separated by short breaks.
                    </p>

                    <h2 className="text-4xl font-semi-bold text-[#abe8bd]">How It Works</h2>
                    <ol className="list-decimal list-inside space-y-2">
                        <li>Choose a task you want to work on</li>
                        <li>Set a timer for 25 minutes and focus on the task</li>
                        <li>When the timer rings, take a 5-minute break</li>
                        <li>Repeat the cycle four times, then take a longer break (15-30 minutes)</li>
                    </ol>

                    <h2 className="text-4xl font-semi-bold text-[#abe8bd]">Why It’s Effective</h2>
                    <ul className="list-disc list-inside space-y-2">
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
