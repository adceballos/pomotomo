import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { startTimer, stopTimer, getTimer, reset } from "../features/timer/timerSlice";

function TestTimer() {
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  // Access timer state from Redux
  const { timer, isRunning, elapsedTimeTotal, isLoading, isError, message } = useSelector((state) => state.timer);

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

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
    dispatch(stopTimer())
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
      <div className="flex justify-center flex-col items-center">
          {isError && <p style={{ color: 'red' }}>{message}</p>}

          <p>Status: {isRunning ? 'RUNNING' : 'PAUSED'}</p>
          <p>Total Time Studied: {Math.floor(elapsedTimeTotal / 1000)} seconds</p>

          <button onClick={handleStart} disabled={isRunning}>Start Timer</button>
          <button onClick={handleStop} disabled={!isRunning}>Stop Timer</button>
      </div>
    );
};


export default TestTimer