import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGoal } from '../features/goals/goalSlice'

function GoalForm() {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createGoal({ text }))
    setText('')
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="text"
        id="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a task..."
        className="w-full text-lg px-3 py-2 text-white bg-transparent placeholder-white border-2 border-white rounded-lg focus:outline-none"
      />
      <button
        type="submit"
        className="w-full mt-2 bg-white text-black py-2 rounded-md hover:bg-[#e2e2e2] transition"
      >
        Add Task
      </button>
    </form>
  )
}

export default GoalForm
