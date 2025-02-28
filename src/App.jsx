import { useState } from 'react'
import Hero from './components/Hero'
import List from './components/List'
import './App.css'
import Navbar from './components/Navbar'
import About from './components/About'

function App() {

  return (
    <div>
      <Navbar />
      <Hero />
      <List />
      <About />
    </div>
  )
}

export default App
