import { useDispatch } from "react-redux"
import {deleteGoal} from '../features/goals/goalSlice'

function GoalItem({goal}) {
    const dispatch = useDispatch()

  return (
    <div className="flex flex-col bg-[#eee0b4] bg-[url('/textures/cream-pixels.png')] bg-repeat px-8 py-4 rounded-md shadow-md mt-4 relative">
        <button className="font-sans text-sm p-0 text-black hover:text-red-500 hover:cursor-pointer absolute top-2 right-3" onClick={() => dispatch(deleteGoal(goal._id))}>X</button>
        <div className="font-sans text-sm mb-2 mt-4">
            {new Date(goal.createdAt).toLocaleString('en-US')}
        </div>
        <h2 className="font-sans font-semibold text-black">
            {goal.text}
        </h2>
    </div>
  )
}
export default GoalItem