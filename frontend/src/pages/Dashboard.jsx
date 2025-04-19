import React from 'react'
import Timer2 from '../components/Timer2'
import logo from "../assets/Logo.svg"
import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Goals from '../components/Goals'
import SpeechBubble from "../components/SpeechBubble"
import { useLocation } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()

  const {user} = useSelector((state) => state.auth)
  const { timer } = useSelector((state) => state.timer)

  const [show, setShow] = useState(false)

  const quotes = [
    "Ready to focus, knight?",
    "Discipline is your sword.",
    "A short break fuels long battles.",
    "Time is your most precious weapon.",
    "Conquer this Pomodoro, claim the next!",
    "Steel your mind, it’s time to work.",
    "The grind is noble.",
    "Guard your focus like treasure.",
    "Breaks are earned, fight for them.",
    "Progress isn’t loud. It’s consistent.",
    "One tomato at a time.",
    "Sow effort, reap mastery.",
    "Every tick is one step closer.",
    "Don’t fear the timer, embrace the challenge.",
    "Even the smallest task can be your training arc.",
    "You are not distracted, you are preparing.",
    "Slay distractions. Protect your time.",
    "Consistency is your most powerful combo.",
    "You’ve got this, focus up, warrior.",
    "Every Pomodoro is a victory.",
    "Take a break. But don’t break the streak.",
    "A wandering mind is a defeated knight.",
    "Stay sharp. Stay strong.",
    "Your quest today: deep focus.",
    "Forge your future, 25 minutes at a time.",
    "Study as if the flame of knowledge were your only light.",
    "Even in stillness, the scholar prepares for war.",
    "The grind is eternal, but so is the reward.",
    "Rest at your desk as one would at a bonfire: briefly, and with purpose.",
    "A sharpened mind is a weapon few can match.",
    "Focus is forged in silence and struggle.",
    "Only through repetition is mastery earned.",
    "In this quiet, you do battle with distraction.",
    "The disciplined endure, the restless fall.",
    "To falter is human. To refocus is divine.",
    "One page, one task, one triumph at a time.",
    "Let no idle hour pass unchallenged.",
    "The untrained mind is easily broken.",
    "Prepare not for ease, but for endurance.",
    "Clarity awaits those who do not turn away.",
    "Your knowledge is your shield. Temper it.",
    "The deeper you study, the darker it gets, but press on.",
    "Even the greatest warriors read between battles.",
    "This is your grind. Your pilgrimage. Make it sacred.",
    "Only the focused transcend the fog of mediocrity.",
  ]

  const [quote] = useState(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    return quotes[randomIndex]
  })
  
  const firstQuote = "Ah, a new warrior enters the garden. Welcome to Pomotomo! My name is Solanum. Start your first timer below."

  // user can only access dashboard page if they are logged in
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  useEffect(() => {
    setShow(true)
  }, [])

  const location = useLocation()

  // used to re-render the speech bubble ease in animation
  useEffect(() => {
    setShow(false)
    const timeout = setTimeout(() => setShow(true), 50)
    return () => clearTimeout(timeout)
  }, [location.pathname])

  return (
    <>
      <div className="flex flex-col min-h-screen text-black py-10 max-w-6xl mx-auto">
        <div className="flex items-start mt-6 relative">

          <div className={`transition-opacity duration-300 ease-in ${show ? 'opacity-100' : 'opacity-0'}`}>
            <SpeechBubble text={!timer ? firstQuote : quote} />
          </div>

          <img src={logo} alt="pomotomo logo" className='w-auto h-46'/>

        </div>
        <div>
          <Timer2 />
        </div>
      </div>
      <div className="flex justify-center mx-auto max-w-6xl">
          <hr className="border-2 border-[#6e2e2b] w-full mb-18" />
      </div>
      <Goals />
    </>
  )
}

export default Dashboard