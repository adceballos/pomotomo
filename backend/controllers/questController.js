const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Timer = require('../models/timerModel')
const { QUESTS } = require('../utils/questData')

const claimQuest = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    const timer = await Timer.findOne({ user: req.user.id })

    const questId = req.params.id
    const quest = QUESTS.find(q => q.id === questId)

    if (!quest) {
        res.status(404)
        throw new Error('Quest not found')
    }

    if (user.questsCompleted.includes(questId)) {
        res.status(400)
        throw new Error('Quest already claimed')
    }

    const progress = {
        pomodoroCountTotal: timer.pomodoroCountTotal,
        pomodoroCount: timer.pomodoroCount,
        sessionsCompleted: timer.sessionsCompleted,
        elapsedTimePomodoro: timer.elapsedTimePomodoro,
        streakCount: user.streakCount,
    }

    const isEligible = (() => {
        switch (questId) {
            case 'quest1':
                return progress.pomodoroCountTotal >= quest.target
            case 'quest2':
                return progress.sessionsCompleted >= quest.target
            case 'quest3':
            case 'quest4':
                    return progress.streakCount >= quest.target
            case 'quest5':
                return progress.elapsedTimePomodoro >= quest.target
            default:
                return false
        }
    })()

    if (!isEligible) {
        res.status(400)
        throw new Error('Quest not yet completed')
    }

    // Update rewards
    user.xp += quest.reward.xp
    user.coins += quest.reward.coins // Placeholder until coin logic
    user.badges.push(quest.reward.badge)
    user.questsCompleted.push(questId)

    const levelThreshold = 100
    while (user.xp >= user.level * levelThreshold) {
        user.level++
    }

    await user.save()
    res.status(200).json({ message: 'Quest claimed!', user })
})

module.exports = { claimQuest }