import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createGoal} from '../features/goals/goalSlice'

function GoalForm() {
    const [text, setText] = useState('')

    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(createGoal({text}))
        // clear the form
        setText('')
    }
    
    return (
    <div className="text-black py-10 px-4">
        <section className='flex items-center justify-center'>
            <form onSubmit={onSubmit} className="space-y-4 w-full max-w-md">
                <div>
                    <label htmlFor='text' className='text-lg'>Task</label>
                    <input 
                        type='text' 
                        className="w-full border-2 border-black rounded-md p-2 focus:border-white focus:outline-none"
                        name='text' 
                        id='text' 
                        value={text} 
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div>
                    <button type='submit' className='w-full mb-6 text-xl bg-black text-white rounded-md p-2 hover:bg-white hover:text-black transition'>
                        Add Task
                    </button>
                </div>
            </form>
        </section>
    </div>
  )
}
export default GoalForm