import { useEffect, useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import Spinner from "../components/Spinner"
import { startTimer, stopTimer, getTimer, resetTimer, fullResetTimer, switchPhase, enableAutoPlay, reset } from "../features/timer/timerSlice"

function TestTimer() {
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  // Access timer state from Redux
  const { timer, isRunning, pomodoroCount, autoPlayEnabled, elapsedTimeTotal, isLoading, initialTime, currentTime, isError, message } = useSelector((state) => state.timer)

  //const [newUser, setNewUser] = useState(true)
  const [timeLeft, setTimeLeft] = useState(0)
  const [hasFetchedTimer, setHasFetchedTimer] = useState(false)
  const [isNewUser, setIsNewUser] = useState(false)
  const suppressAutoStopRef = useRef(false)  // used to fix error that was causing the timer to be stopped more than once when timer hit 0

  useEffect(() => {
    if (currentTime !== undefined) {
      setTimeLeft(Math.floor(currentTime / 1000))
    }
  }, [currentTime])    

  useEffect(() => {
    let interval
  
    if (isRunning && timer?.startTime && timer?.currentTime) {
      const start = new Date(timer.startTime).getTime()
  
      interval = setInterval(() => {
        const now = Date.now()
        const elapsed = now - start
        const remaining = Math.max(timer.currentTime - elapsed, 0)
        setTimeLeft(Math.floor(remaining / 1000))
      }, 100)
    }
  
    return () => clearInterval(interval)
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
    const safeSeconds = Math.max(0, seconds) // never go below 0
    const minutes = String(Math.floor(safeSeconds / 60)).padStart(2, '0')
    const secs = String(safeSeconds % 60).padStart(2, '0')
    return `${minutes}:${secs}`
  }

  if (!hasFetchedTimer || isLoading) {
    return <Spinner />
  }
  
  return (
    <div className="flex justify-center flex-col items-center">
      {isNewUser ? (
      <div>
        <p>Welcome to Pomotomo!</p>
        <button onClick={handleStart} disabled={isRunning} className={`p-1 border-1 ${isRunning ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'hover:bg-green-500 hover:text-white transition-colors duration-200'}`}>Start Your First Timer</button>
      </div> ) : (
      <div>
        <p>Status: {isRunning ? 'RUNNING' : 'STOPPED'}</p>
        <p>Counting down from: {Math.floor(initialTime / 1000)} seconds</p>
        <p>Current time left: {formatTime(timeLeft)}</p>
        <p>Total time passed: {Math.floor(elapsedTimeTotal / 1000)} seconds</p>
        <p>Total pomodoro phases completed: {pomodoroCount}</p>
        <button onClick={handleStart} disabled={isRunning} className={`p-1 border-1 ${isRunning ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'hover:bg-green-500 hover:text-white transition-colors duration-200'}`}>Start Timer</button>
        <button onClick={handleStop} disabled={!isRunning} className={`p-1 border-1 ml-4 ${!isRunning ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'hover:bg-red-500 hover:text-white transition-colors duration-200'}`}>Stop Timer</button>
        <button onClick={handleReset} className="p-1 border-1 hover:cursor-pointer ml-4 hover:bg-green-500 hover:text-white transition-colors duration-200">Reset Timer</button>
        <button onClick={handleFullReset} className="p-1 border-1 hover:cursor-pointer ml-4 hover:bg-green-500 hover:text-white transition-colors duration-200">Full Reset Timer</button>
        {autoPlayEnabled ? (
          <button onClick={handleAutoPlay} className="p-1 border-1 hover:cursor-pointer ml-4 hover:bg-green-500 hover:text-white transition-colors duration-200">Auto Play: ON</button>
        ) : (
          <button onClick={handleAutoPlay} className="p-1 border-1 hover:cursor-pointer ml-4 hover:bg-green-500 hover:text-white transition-colors duration-200">Auto Play: OFF</button>
        )}
      </div>
      )}
    </div>
  )
}

export default TestTimer