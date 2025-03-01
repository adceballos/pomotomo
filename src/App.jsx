import { useState } from 'react'
import Hero from './components/Hero'
import List from './components/List'
import './App.css'
import Navbar from './components/Navbar'
import About from './components/About'

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <Hero />
      <List isOpen={isOpen} setIsOpen={setIsOpen} />
      <About />
    </div>
  )
}

export default App
