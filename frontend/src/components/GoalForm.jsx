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
    <div>
        <section className='flex items-center justify-center'>
            <form onSubmit={onSubmit} className="space-y-4 w-full max-w-md">
                <div>
                    <label htmlFor='text' className='text-lg'>Task</label>
                    <input 
                        type='text' 
                        className="w-full border-2 border-[#1c1b19] p-2 focus:outline-none bg-gray-200"
                        name='text' 
                        id='text' 
                        value={text} 
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div>
                    <button type='submit' className='w-full border-2 mb-10 text-xl border-[#1c1b19] text-[#eee0b4] bg-[#6a512d] p-2 hover:bg-[#6e2e2b] hover:cursor-pointer transition-colors duration-200'>
                        Add Task
                    </button>
                </div>
            </form>
        </section>
    </div>
  )
}
export default GoalForm