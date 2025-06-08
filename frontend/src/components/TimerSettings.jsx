import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCustomTimes, getTimer } from '../features/timer/timerSlice'
import {toast} from 'react-toastify'

function TimerSettings({ onClose }) {
  const dispatch = useDispatch()
  const { isLoading, pomoTime, breakTime, longBreakTime } = useSelector((state) => state.timer)

  const [pomo, setPomo] = useState(10)
  const [shortBreak, setShortBreak] = useState(5)
  const [longBreak, setLongBreak] = useState(15)

  // load values from backend
  useEffect(() => {
    if (pomoTime) setPomo(Math.floor(pomoTime / 1000))
    if (breakTime) setShortBreak(Math.floor(breakTime / 1000))
    if (longBreakTime) setLongBreak(Math.floor(longBreakTime / 1000))
  }, [pomoTime, breakTime, longBreakTime])

  const handleSave = async () => {
    try {
      await dispatch(setCustomTimes({
        pomoTime: pomo,
        breakTime: shortBreak,
        longBreakTime: longBreak,
      })).unwrap()
  
      // Only fetch updated timer if custom times were saved successfully
      dispatch(getTimer())
      onClose()
    } catch (err) {
      toast.error(err)
    }
  }  
  
  return (
    <div className="fixed px-4 inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-gray-100 rounded-lg p-10 w-full max-w-lg shadow-lg transform transition-all scale-100">
        <h2 className="text-2xl mb-4 max-md:text-center">Customize Timer Durations</h2>

        <div className="flex max-md:flex-col md:space-x-6 text-sm text-gray-700">
          <div className="flex flex-col items-center">
            <label className="mb-2 text-lg">Pomodoro</label>
            <input
              type="number"
              min={10}
              max={60}
              value={pomo}
              onChange={(e) => setPomo(Number(e.target.value))}
              className="w-20 font-sans text-center p-1 rounded bg-gray-200 border-2"
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="mb-2 text-lg">Short Break</label>
            <input
              type="number"
              min={3}
              max={30}
              value={shortBreak}
              onChange={(e) => setShortBreak(Number(e.target.value))}
              className="w-20 font-sans text-center p-1 rounded bg-gray-200 border-2"
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="mb-2 text-lg">Long Break</label>
            <input
              type="number"
              min={5}
              max={60}
              value={longBreak}
              onChange={(e) => setLongBreak(Number(e.target.value))}
              className="w-20 font-sans text-center p-1 rounded bg-gray-200 border-2"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="ml-4 text-md text-red-500 hover:underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default TimerSettings