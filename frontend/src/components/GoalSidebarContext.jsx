import { createContext, useState, useContext } from 'react'

const GoalSidebarContext = createContext()

export const useGoalSidebar = () => useContext(GoalSidebarContext)

export const GoalSidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(prev => !prev)
  const closeSidebar = () => setIsOpen(false)

  return (
    <GoalSidebarContext.Provider value={{ isOpen, toggleSidebar, closeSidebar }}>
      {children}
    </GoalSidebarContext.Provider>
  )
}
