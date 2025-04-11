import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'
import { useGoalSidebar } from '../components/GoalSidebarContext'

function Goals() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  )
  const { isOpen } = useGoalSidebar()

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (user) {
      dispatch(getGoals())
    }

    return () => {
      dispatch(reset())
    }
  }, [user, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="relative">
      {/* Sidebar Styled Container */}
      <div className={`
        fixed top-24 left-5 h-[80vh] w-72 bg-[#4934239c] rounded-2xl border border-[#fccfbd] text-white shadow-lg shadow-[#fcbba2a1] p-4 overflow-hidden z-200 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-[500px]'}
      `}>
        <div>
          <GoalForm />
        </div>

        {/* Scrollable Goal List */}
        <div className="overflow-y-auto max-h-[60vh] mt-4 space-y-3 pr-2 w-full max-w-md">
        {goals.length > 0 ? (
            goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))
          ) : (
            <h3 className="text-center text-white text-lg">You have no tasks</h3>
          )}
        </div>
      </div>
    </div>
  )
}

export default Goals
