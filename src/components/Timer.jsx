import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";
import tomatoIcon from "../assets/tomato.svg";
import click from "../assets/click.mp3";

export default function Timer() {
  const [isRunning, setIsRunning] = useState(false);  
  const [time, setTime] = useState(5); // 5 secs for testing
  const [isPomodoro, setIsPomodoro] = useState(true);
  const [counter, setCounter] = useState(2);
  const [showTomato, setShowTomato] = useState(false);
  const [showTomato2, setShowTomato2] = useState(false);
  const [showTomato3, setShowTomato3] = useState(false);
  const [showTomato4, setShowTomato4] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [totalTomatoes, setTotalTomatoes] = useState(0);
  const intervalIdRef = useRef(null);

  // Effect for counting down the timer
  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setTime((prev) => {  // update time by subtracting 1 from the previous value. prev contains the previous state of elapsedTime. 3 -> 2 -> 1.
          if (prev < 1) { // when timer reaches 1 sec, clear the interval to stop updates, set isRunning to false so we don't go into negative time, and return 0 so timer displays 00:00. Otherwise, we return prev - 1, aka the next second. 
            clearInterval(intervalIdRef.current);
            if (autoPlay === false) {
              setIsRunning(false); // Stop the timer at zero
            }
            playAlarm();
            incrementCounter();
            if (counter % 2 === 0) {  // means we're now on a break phase
              setIsPomodoro(false);
              incrementTomato();  // just finished a pomodoro, so increment

              if (counter === 2) {  //these two lines rhyme
                setShowTomato(true);
                setTime(3);
              }
              else if (counter === 4) {
                setShowTomato2(true);
                setTime(3);
              }
              else if (counter === 6) {
                setShowTomato3(true);
                setTime(3);
              }
              else if (counter === 8) {
                setShowTomato4(true);
                setTime(10);  // long break!
              }
            }
            else if (counter === 9) {
              resetCounter();
              setShowTomato(false);
              setShowTomato2(false);
              setShowTomato3(false);
              setShowTomato4(false);
              setIsPomodoro(true);
              setTime(5);
            }
            else {
              setIsPomodoro(true);
              setTime(5);
            }
            if (autoPlay) {
              setIsRunning(true);
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalIdRef.current);
  }, [isRunning, time]); 

  // Start timer
  function start() {
    setIsRunning(true);
    clickSound();
  }

  // Stop timer
  function stop() {
    setIsRunning(false);
    clickSound();
  }

  // Reset timer
  function reset() {
    if (isPomodoro) {
      setTime(5);
    }
    else {
      setTime(3);
    }
    setIsRunning(false);
    clickSound();
  }

  function auto() {
    setAutoPlay((prev) => !prev); // Toggle autoPlay on/off
    clickSound();
  }

  function incrementCounter() {
    setCounter(counter + 1);
  }

  function resetCounter() {
    setCounter(2);
  }

  function incrementTomato() {
    setTotalTomatoes(totalTomatoes + 1);
  }

  function playAlarm() {
    const audio = new Audio("../assets/alarm.mp3");
    audio.play();
  }

  function clickSound() {
    const audio = new Audio(click);
    audio.play();
  }

  // Format time to MM:SS
  function formatTime() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    return `${minutes}:${seconds}`;
  }

  return (
<div className="flex flex-col items-center justify-center text-white">
  <div className="text-6xl md:text-8xl p-6">{formatTime()}</div>
    <div className="flex gap-5 text-xl">
        <Button onClick={start} text="Start" />
        <Button onClick={stop} text="Stop" />
        <Button onClick={reset} text="Reset" />
        <Button onClick={auto} text={autoPlay ? "Auto Play: On" : "Auto Play: Off"} />
    </div>
      <div className="flex flex-row">
        <img src={tomatoIcon} alt="tomato" width="80" height="100" className={`mt-4 w-24 h-24 transition-opacity duration-1000 ease-in-out ${
          showTomato ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        />
        <img src={tomatoIcon} alt="tomato" width="80" height="100" className={`mt-4 w-24 h-24 transition-opacity duration-1000 ease-in-out ${
          showTomato2 ? "opacity-100" : "opacity-0"
        }`}
        />
        <img src={tomatoIcon} alt="tomato" width="80" height="100" className={`mt-4 w-24 h-24 transition-opacity duration-1000 ease-in-out ${
          showTomato3 ? "opacity-100" : "opacity-0"
        }`}
        />
        <img src={tomatoIcon} alt="tomato" width="80" height="100" className={`mt-4 w-24 h-24 transition-opacity duration-1000 ease-in-out ${
          showTomato4 ? "opacity-100" : "opacity-0"
        }`}
        />
      </div>

      <div className="absolute top-210 left-6 p-2 text-white text-2xl">
        Pomodoros Completed: <span className="text-yellow-400">{totalTomatoes}</span>
      </div>
    </div>
  );
}