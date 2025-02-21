import React from 'react';
import Stopwatch from './Timer';
import click from "../assets/click.mp3";


export default function List() {
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#ff7f7f] min-h-screen text-white" id='list'>
      <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-[VT323]'>Tasks goes here!</h1>
    </div>
  )
}