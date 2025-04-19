import { useEffect, useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { QUESTS } from '../../../shared/questData'
import BackToHome from "../components/BackToHome.jsx";

function Quests() {
    const { pomodoroCount, elapsedTimePomodoro } = useSelector((state) => state.timer)
    const { user } = useSelector((state) => state.auth)

    const getProgress = (quest) => {
        switch (quest.id) {
          case 'quest1':
            return pomodoroCount >= quest.target
          case 'quest2':
            return pomodoroCount >= quest.target
          case 'quest3':
            return false
          case 'quest4':
            return false
          case 'quest5':
            return elapsedTimePomodoro >= quest.target // 10 hours in ms = 36000000ms, using 80 seconds in ms = 80000, temporarily
          default:
            return false
        }
      }

      return (
        <div className="flex justify-center items-center h-screen max-w-4xl mx-auto">
            <div className="text-black border-4 w-full border-[#6e2e2b] bg-[#eee0b4] bg-[url('/textures/cream-pixels.png')] bg-repeat shadow-lg p-6">
                
                <div className=" text-[#eee0b4]">
                <h1 className="text-4xl text-black mb-2">Quests</h1>
                {QUESTS.map((quest) => {
                    const isCompleted = getProgress(quest)
                    return (
                    <div key={quest.id} className="bg-[#6a512d] p-4 rounded mb-4 border-2 border-[#1c1b19]">
                        <h2 className="text-3xl mb-2">{quest.name}</h2>
                        <p className="text-xl">{quest.desc}</p>
                        <p className="text-md mt-2 text-green-300">Reward: {quest.reward.xp} XP</p>
                        <div className="mt-2">
                        {isCompleted ? (
                            <button className="px-4 py-2 bg-green-700 border-[#1c1b19] border-1 text-white">Claim</button>
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