export const QUESTS = [
    {
      id: 'quest1',
      name: 'Training Arc Begins',
      desc: 'Complete 1 pomodoro phase',
      target: 1,   // compare to pomodoroCount
      reward: { xp: 10, badge: 'Training Arc Begins' }
    },
    {
      id: 'quest2',
      name: 'Endure the Fire',
      desc: 'Complete 4 pomodoro phases in one session',
      target: 4,   // compare to pomodoroCount
      reward: { xp: 25, badge: 'Endure the Fire' }
    },
    {
      id: 'quest3',
      name: 'The Oath Begins',
      desc: 'Reach a 3 day streak',
      target: 3,   // compare to streak
      reward: { xp: 50, badge: 'The Oath Begins' }
    },
    {
      id: 'quest4',
      name: 'The Disciplined',
      desc: 'Reach a 7 day streak',
      target: 7,   // compare to streak
      reward: { xp: 100, badge: 'The Disciplined' }
    },
    {
      id: 'quest5',
      name: 'Soul of the Scholar',
      desc: 'Spend 10 total hours in the pomodoro phase (80 seconds for testing)',
      target: 80000,   // compare to pomodoroCount
      reward: { xp: 150, badge: 'Soul of the Scholar' }
    },
  ]