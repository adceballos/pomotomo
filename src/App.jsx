import { useState } from 'react'
import Hero from './components/Hero'
import List from './components/List'
import './App.css'
import Navbar from './components/Navbar'

function App() {

  return (
    <div>
      <Navbar />
      <Hero />
      <List />
    </div>
  )
}

export default App
