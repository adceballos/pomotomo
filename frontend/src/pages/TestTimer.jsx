import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { startTimer, stopTimer, getTimer, reset } from "../features/timer/timerSlice";

function TestTimer() {
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {timer, isLoading, isError, message} = useSelector(
    (state) => state.timer
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (user && (!timer || timer.elapsedTimeTotal === undefined)) { // Only fetch if user exists and timer isn't loaded
      console.log("Fetching timer...");
      dispatch(getTimer());
    }

    // when component unmounts
    return () => {
      dispatch(reset())
    }
  }, [user, isError, message, dispatch, timer])

  if (isLoading) {
    return <Spinner />
  }
  
return (
    <div className="flex items-center text-2xl flex-col">
      Hello World
    </div>
  )
}

export default TestTimer