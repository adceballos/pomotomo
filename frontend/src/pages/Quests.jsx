import { useEffect, useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { QUESTS } from '../utils/questData'
import BackToHome from "../components/BackToHome.jsx"
import { claimQuest } from '../features/quests/questSlice'
import { getTimer } from '../features/timer/timerSlice'
import { getMe } from "../features/auth/authSlice.js"
import Spinner from "../components/Spinner"

function Quests() {
  const dispatch = useDispatch()

  const { pomodoroCountTotal, pomodoroCount, elapsedTimePomodoro, sessionsCompleted } = useSelector((state) => state.timer)
  const { user, isLoading } = useSelector((state) => state.auth)

  const claimedQuests = user?.questsCompleted || []

  const getProgress = (quest) => {
    switch (quest.id) {
      case 'quest1':
        return pomodoroCountTotal >= quest.target
      case 'quest2':
        return sessionsCompleted >= quest.target
      case 'quest3':
      case 'quest4':
        return user?.streakCount >= quest.target
      case 'quest5':
        return elapsedTimePomodoro >= quest.target // 10 hours in ms = 36000000ms, using 80 seconds in ms = 80000, temporarily
      default:
        return false
    }
  }

  useEffect(() => {
    dispatch(getTimer())
    dispatch(getMe())
  }, [dispatch])

  const handleClaim = async (questId) => {
    await dispatch(claimQuest(questId)).unwrap()
    dispatch(getMe())
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="flex flex-col justify-center h-screen max-w-4xl mx-auto">
      <h1 className="text-6xl text-black mb-18 -mt-18 flex justify-center">Quests</h1>
      <div className="text-black border-4 w-full border-[#6e2e2b] bg-[#eee0b4] bg-[url('/textures/cream-pixels.png')] bg-repeat shadow-lg p-6 h-[75vh] overflow-y-auto">
          
            <div className=" text-[#eee0b4]">
            {QUESTS.map((quest) => {
                const isCompleted = getProgress(quest)
                const isClaimed = claimedQuests.includes(quest.id)
                return (
                <div key={quest.id} className="bg-[#6a512d] p-4 mb-4 border-2 border-[#1c1b19]">
                    <h2 className="text-3xl mb-2">{quest.name}</h2>
                    <p className="text-xl">{quest.desc}</p>
                    <p className="text-md mt-2 ">Reward:</p>
                    <p className="text-md text-green-300">XP: {quest.reward.xp}</p>
                    <p className="text-md text-yellow-300">Pomocoins: {quest.reward.coins}</p>
                    <p className="text-md text-blue-300">Badge: {quest.reward.badge}</p>
                    <div className="mt-2">
                    {isClaimed ? (
                      <button disabled className="px-4 py-2 bg-gray-700 text-white border-[#1c1b19] border-1 cursor-not-allowed">
                        Completed
                      </button>
                    ) : isCompleted ? (
                      <button
                        className="px-4 py-2 bg-green-700 text-white border-[#1c1b19] border-1"
                        onClick={() => handleClaim(quest.id)}
                      >
                        Claim
                      </button>
                    ) : (
                      <button disabled className="px-4 py-2 bg-gray-600 text-gray-300 border-[#1c1b19] border-1 cursor-not-allowed">
                        In Progress
                      </button>
                    )}
                    </div>
                </div>
                )
            })}
            </div>
        </div>
        <BackToHome />
    </div>
  )
}
export default Quests