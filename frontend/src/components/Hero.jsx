import React from 'react'
import Timer from './Timer'
import Button from './Button';
import click from "../assets/click.mp3";
import logo from "../assets/Logo.svg";
import List from './List';

export default function Hero() {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-[#fd8989] text-black px-4 py-10">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-[VT323] text-center">Pomotomo!</h1>
      <div className='flex items-center justify-center mt-4'>
        <img src={logo} alt='pomotomo logo' max-width='100%' height='100' width='180'/>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <Timer />
      </div>

      <div className="flex justify-center gap-5 mb-12">
        <Button href="#list" text="Tasks" />
        <Button href="/about" text="About" />
      </div>

      <List />
    </div>
  )
}