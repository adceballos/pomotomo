import React from 'react'
import Timer from './Timer'
import Button from './Button';
import click from "../assets/click.mp3";

export default function Hero() {

  function clickSound() {
    const audio = new Audio(click);
    audio.play();
  }
  
  return (
    <div className="flex flex-col justify-between min-h-screen bg-[#ff7f7f] text-white px-4 py-10">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-[VT323] text-center">Pomotomo!</h1>
      
      <div className="flex-grow flex items-center justify-center pb-20">
        <Timer />
      </div>

      <div className="pb-4 flex justify-center">
        <Button onClick={clickSound} href="#list" text="Tasks" />
      </div>

      <div className="absolute top-210 right-6 p-4 text-md">
        PLAY/PAUSE MUSIC
      </div>
    </div>
  )
}