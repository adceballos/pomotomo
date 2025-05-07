import { useEffect, useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { FaGear } from 'react-icons/fa6'
import Spinner from "../components/Spinner"
import tomatoIcon from "../assets/tomato.png"
import TimerSettings from "../components/TimerSettings"
import { startTimer, stopTimer, getTimer, resetTimer, fullResetTimer, switchPhase, enableAutoPlay, reset } from "../features/timer/timerSlice"

function Timer2() {
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  // Access timer state from Redux
  const { timer, isRunning, pomodoroCount, isPomodoro, autoPlayEnabled, isLoading, initialTime, currentTime, isError, message } = useSelector((state) => state.timer)

  //const [newUser, setNewUser] = useState(true)
  const [timeLeft, setTimeLeft] = useState(0)
  const [hasFetchedTimer, setHasFetchedTimer] = useState(false)
  const [isNewUser, setIsNewUser] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const suppressAutoStopRef = useRef(false)  // used to fix error that was causing the timer to be stopped more than once when timer hit 0
  
  const progress = initialTime > 0 ? timeLeft / (initialTime / 1000) : 1

  useEffect(() => {
    if (currentTime !== undefined) {
      setTimeLeft(Math.floor(currentTime / 1000))
    }
  }, [currentTime])    

  useEffect(() => {
    let animationFrameId;
  
    const tick = () => {
      if (isRunning && timer?.startTime && timer?.currentTime) {
        const now = Date.now()
        const start = new Date(timer.startTime).getTime()
        const elapsed = now - start
        const remaining = Math.max(timer.currentTime - elapsed, 0)
        setTimeLeft(remaining / 1000)
        animationFrameId = requestAnimationFrame(tick)
      }
    }
  
    if (isRunning) {
      animationFrameId = requestAnimationFrame(tick)
    }
  
    return () => cancelAnimationFrame(animationFrameId)
  }, [isRunning, timer?.startTime, timer?.currentTime])

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      suppressAutoStopRef.current = true
  
      dispatch(switchPhase()).then(() => {
        dispatch(resetTimer()).then((action) => {
          const updated = action.payload
          setTimeLeft(Math.floor(updated.currentTime / 1000))
  
          if (autoPlayEnabled) {
            dispatch(startTimer())
          }
        })
      })
    }
  }, [timeLeft, isRunning, autoPlayEnabled, dispatch])

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden' && isRunning) {
        suppressAutoStopRef.current = true
        dispatch(stopTimer())
      }
    }
  
    document.addEventListener('visibilitychange', handleVisibility)
  
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)

      if (isRunning && !suppressAutoStopRef.current) {
        dispatch(stopTimer())
      }
      suppressAutoStopRef.current = false
    }
  }, [isRunning, dispatch])
  
  useEffect(() => {
    const fetchTimer = async () => {
      try {
        await dispatch(getTimer()).unwrap()
        setIsNewUser(false)
      } catch (err) {
        if (typeof err === 'string' && err.includes('No timer found')) {
          setIsNewUser(true)
        } else {
          console.error('Timer fetch error:', err)
        }
      } finally {
        setHasFetchedTimer(true)
      }
    }
  
    if (user) fetchTimer()
  
    return () => {
      dispatch(reset())
    }
  }, [user, dispatch])

  // dispatch startTimer() dispatches an action to start the timer in redux, which is a POST request that sends a req to start the timer
  // this is why we only dispatch when the start timer is clicked, so we make the post req to set the start date time in the backend
  const handleStart = () => {
    dispatch(startTimer())
    setIsNewUser(false)
  }
  
  const handleAutoPlay = () => {
    dispatch(enableAutoPlay())
  }

  const handleStop = () => {
    suppressAutoStopRef.current = true
    dispatch(stopTimer())
  }

  const handleReset = () => {
    suppressAutoStopRef.current = true
    dispatch(resetTimer()).then((action) => {
      const updated = action.payload
      setTimeLeft(Math.floor(updated.currentTime / 1000))
    })
  }

  const handleFullReset = () => {
    suppressAutoStopRef.current = true
    dispatch(fullResetTimer()).then((action) => {
      const updated = action.payload
      setTimeLeft(Math.floor(updated.currentTime / 1000))
    })
  }

  const formatTime = (seconds) => {
    const safeSeconds = Math.max(0, Math.floor(seconds))
    const minutes = String(Math.floor(safeSeconds / 60)).padStart(2, '0')
    const secs = String(safeSeconds % 60).padStart(2, '0')
    return `${minutes}:${secs}`
  }

  if (!hasFetchedTimer) {
    return <Spinner />
  }
  
  return (
    <div className="flex flex-col items-center justify-center text-black border-4 border-[#6e2e2b] max-w-6xl mx-auto mt-6 bg-[#eee0b4] bg-[url('/textures/cream-pixels.png')] bg-repeat shadow-lg">
        
    <div className="relative flex items-center w-full">
        <div className="absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-5xl">Pomotomo!</h1>
        </div>

        <div className="ml-auto">
            <button onClick={() => setShowSettings(true)} className="px-4 py-6 text-black hover:cursor-pointer border-l-[#6e2e2b] hover:text-[#6a512d] hover:border-l-[#6e2e2b] flex items-center rounded-tr-md border-l-4 gap-2 text-lg transition-colors duration-200">
                <FaGear />
            </button>
            {showSettings && <TimerSettings onClose={() => setShowSettings(false)} />}
        </div>
    </div>

    <hr className="w-full border-2 border-[#6e2e2b]" />

    <div className="max-w-4xl mt-6">
        <div className="flex justify-between px-8 mb-12">
            <div className="relative w-92 h-92">
                <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="#e5e7eb"
                        strokeWidth="4"
                        fill="none"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="#6e2e2b"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={2 * Math.PI * 45}
                        strokeDashoffset={(1 - progress) * 2 * Math.PI * 45}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                    />
                </svg>
                <div className="flex items-center justify-center w-full h-full text-6xl md:text-8xl">
                    {formatTime(timeLeft)}
                </div>
            </div> 

            <div className="flex flex-col justify-center gap-y-6">
                <p className="text-2xl md:text-4xl"><span className="text-[#6e2e2b]">STATUS: </span> {isRunning ? 'Running' : 'Stopped'}</p>
                <p className="text-2xl md:text-4xl"><span className="text-[#6e2e2b]">PHASE: </span> {isPomodoro ? 'Pomodoro' : 'Break'}</p>
                <p className="text-2xl md:text-4xl"><span className="text-[#6e2e2b]">START TIME:</span> {Math.floor(initialTime / 1000)} seconds</p>
            </div>
        </div>

        <div className="flex gap-5 text-xl">
        <button onClick={handleStart} disabled={isRunning} className={`py-2 px-6 text-2xl border-3 border-[#1c1b19] text-[#eee0b4] bg-[#6a512d] ${isRunning ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'hover:bg-[#6e2e2b] hover:cursor-pointer transition-colors duration-200'} ${isNewUser ? 'animate-bounce' : ''}`}>Start</button>
        <button onClick={handleStop} disabled={!isRunning} className={`py-2 px-6 text-2xl border-3 ml-4 border-[#1c1b19] text-[#eee0b4] bg-[#6a512d] ${!isRunning ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'hover:bg-[#6e2e2b] hover:cursor-pointer transition-colors duration-200'}`}>Stop</button>
            <button onClick={handleReset} disabled={isNewUser} className={`py-2 px-6 text-2xl border-3 ml-4 border-[#1c1b19] text-[#eee0b4] bg-[#6a512d] ${isNewUser ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'hover:bg-[#6e2e2b] hover:cursor-pointer transition-colors duration-200'}`}>Reset</button>
            <button onClick={handleFullReset} disabled={isNewUser} className={`py-2 px-6 text-2xl whitespace-nowrap border-3 ml-4 border-[#1c1b19] text-[#eee0b4] bg-[#6a512d] ${isNewUser ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'hover:bg-[#6e2e2b] hover:cursor-pointer transition-colors duration-200'}`}>Full Reset</button>
            {autoPlayEnabled ? (
            <button onClick={handleAutoPlay} disabled={isNewUser} className={`min-w-[14rem] py-2 px-6 text-2xl border-3 ml-4 border-[#1c1b19] text-[#eee0b4] bg-[#6a512d] ${isNewUser ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'hover:bg-[#6e2e2b] hover:cursor-pointer transition-colors duration-200'}`}>Auto Play: ON</button>
            ) : (
            <button onClick={handleAutoPlay} disabled={isNewUser} className={`min-w-[14rem] py-2 px-6 text-2xl border-3 ml-4 border-[#1c1b19] text-[#eee0b4] bg-[#6a512d] ${isNewUser ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'hover:bg-[#6e2e2b] hover:cursor-pointer transition-colors duration-200'}`}>Auto Play: OFF</button>
            )}
        </div>

        <div className="flex py-10 mx-auto items-center justify-center gap-12 mt-6 min-h-[64px] transition-all duration-300">
            {[...Array(4)].map((_, index) => (
                <img key={index} src={tomatoIcon} alt="tomato" className={`w-auto h-24 transition-opacity duration-300 ${index < pomodoroCount ? 'opacity-100' : 'opacity-0'}`}/>
            ))}
        </div>
    </div>

    </div>
  )
}

export default Timer2