import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'

function Goals() {
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {goals, isLoading, isError, message} = useSelector(
    (state) => state.goals
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (user) {
      dispatch(getGoals())
    }

    // when component unmounts
    return () => {
      dispatch(reset())
    }
  }, [user, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="min-h-screen bg-checkerboard text-black" id='tasks'>
      <section className='flex items-center justify-center text-6xl text-black mb-12'>
        <h1>Tasks</h1>
      </section>

      <GoalForm />

      <section className='flex flex-wrap justify-center items-center gap-4 md:px-96'>
        {goals.length > 0 ? (
            goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))
          ) : (<h3 className='text-center text-2xl'>You have not made any tasks</h3>)}
      </section>
    </div>
  )
}
export default Goals

