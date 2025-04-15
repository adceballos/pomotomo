import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { startTimer, stopTimer, getTimer, resetTimer, switchPhase, reset } from "../features/timer/timerSlice";

function TestTimer() {
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  // Access timer state from Redux
  const { timer, isRunning, pomodoroCount, elapsedTimeTotal, isLoading, initialTime, currentTime, isError, message } = useSelector((state) => state.timer);

  //const [newUser, setNewUser] = useState(true)
  const [timeLeft, setTimeLeft] = useState(0)
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
        const now = Date.now();
        const elapsed = now - start
        const remaining = Math.max(timer.currentTime - elapsed, 0)
        setTimeLeft(Math.floor(remaining / 1000))
      }, 100) // update every 100ms instead of 1000ms
    }
  
    return () => clearInterval(interval)
  }, [isRunning, timer?.startTime, timer?.currentTime])
  

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      suppressAutoStopRef.current = true
      // Wait for switchPhase and resetTimer to both complete
      dispatch(switchPhase()).then(() => {
        dispatch(resetTimer()).then((action) => {
          const updated = action.payload
          setTimeLeft(Math.floor(updated.currentTime / 1000))
        })
      })
    }
  }, [timeLeft, isRunning, dispatch])

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
    if (isError) {
      console.log(message)
    }

    // Adding && timer from this conditional fixed the constant get request and no timer found console error, but caused a new error that wouldn't display correct values from the backend until a timer was started and stopped
    // Need to find a way to fix the inifinite get request loop
    if (user) {
      dispatch(getTimer())
    }

    // when component unmounts
    return () => {
      dispatch(reset())
    }
  }, [user, isError, message, dispatch])

  // dispatch startTimer() dispatches an action to start the timer in redux, which is a POST request that sends a req to start the timer
  // this is why we only dispatch when the start timer is clicked, so we make the post req to set the start date time in the backend
  const handleStart = () => {
    dispatch(startTimer())
  }

  const handleStop = () => {
    suppressAutoStopRef.current = true
    dispatch(stopTimer())
  }

  const handleReset = () => {
    suppressAutoStopRef.current = true
    dispatch(resetTimer()).then((action) => {
      const updated = action.payload;
      setTimeLeft(Math.floor(updated.currentTime / 1000))
    })
  }

  const formatTime = (seconds) => {
    const safeSeconds = Math.max(0, seconds) // never go below 0
    const minutes = String(Math.floor(safeSeconds / 60)).padStart(2, '0')
    const secs = String(safeSeconds % 60).padStart(2, '0')
    return `${minutes}:${secs}`
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="flex justify-center flex-col items-center">
      <div>
        <p>Status: {isRunning ? 'RUNNING' : 'STOPPED'}</p>
        <p>Counting down from: {Math.floor(initialTime / 1000)} seconds</p>
        <p>Current time left: {formatTime(timeLeft)}</p>
        <p>Total time passed: {Math.floor(elapsedTimeTotal / 1000)} seconds</p>
        <p>Total pomodoro phases completed: {pomodoroCount}</p>
        <button onClick={handleStart} disabled={isRunning} className={`p-1 border-1 ${isRunning ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'hover:bg-green-500 hover:text-white transition-colors duration-200'}`}>Start Timer</button>
        <button onClick={handleStop} disabled={!isRunning} className={`p-1 border-1 ml-4 ${!isRunning ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'hover:bg-red-500 hover:text-white transition-colors duration-200'}`}>Stop Timer</button>
        <button onClick={handleReset} className="p-1 border-1 hover:cursor-pointer ml-4 hover:bg-green-500 hover:text-white transition-colors duration-200">Reset Timer</button>
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default TestTimer