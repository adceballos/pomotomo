import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'

function GoalItem({ goal }) {
  const dispatch = useDispatch()

  return (
    <div className="w-full max-w-md flex gap-x-3 items-center border border-white text-lg text-[#2e2e2e] px-3 py-2 rounded-md bg-[#f1dac4] shadow">
      <button
        onClick={() => dispatch(deleteGoal(goal._id))}
        className="text-red-800 hover:text-red-600 font-bold"
      >
        x
      </button>
      <span className="flex-1">{goal.text}</span>
    </div>
  )
}

export default GoalItem
