import BackToHome from "../components/BackToHome.jsx";

function About() {
    return (
        <>
            <div className="flex flex-col min-h-screen mt-12 text-black">
                <BackToHome />
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-9xl text-center">
                    𓆝 𓆟 𓆞 𓆝 𓆟
                </h1>
                
                <div className="max-w-2xl mx-auto text-2xl mt-12 text-left">
                <h2 className="tagesschrift text-6xl font-semi-bold text-[#6e2e2b] mb-2">About</h2>
                    <p className="tagesschrift mb-10">
                        Pomotomo is a productivity app that combines the Pomodoro Technique with gamification to help you 
                        stay focused and motivated. It allows you to set tasks, track your progress, and earn rewards for 
                        completing your work sessions. With Pomotomo, you can break your work into manageable chunks, take regular breaks, 
                        and build a sustainable workflow that keeps you energized and productive.       
                    </p>

                    <h2 className="tagesschrift text-6xl font-semi-bold text-[#6e2e2b] mb-2">Focus. Break. Repeat!</h2>
                    <ul className="tagesschrift mb-10">
                        <li>➢ Create a task that you would like to work on</li>
                        <li>➢ Adjust your study time using the ⚙︎ icon</li>
                        <li>➢ Start the timer and commit fully until it rings</li>
                        <li>➢ Take a short break</li>
                        <li>➢ After four Pomodoros, take a longer break</li>
                    </ul>

                    <h2 className="tagesschrift text-6xl font-semi-bold text-[#6e2e2b] mb-2">Why use Pomotomo?</h2>
                    <ul className="font-sans *:list-disc list-inside space-y-2">
                        <p className="tagesschrift">
                        ➢ The Pomodoro Technique helps reduce mental fatigue, fight procrastination, and sharpen focus. By creating a sense of urgency and building in regular breaks, it boosts productivity while supporting a healthy workflow.
                        </p>
                        <p className="tagesschrift mb-10">
                        ➢ Gamification in Pomotomo adds a fun layer of reward — turning consistent focus into visible progress you can track and feel good about.
                        </p>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default About