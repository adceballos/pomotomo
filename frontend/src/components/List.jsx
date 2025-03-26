import Stopwatch from './Timer';
import click from "../assets/click.mp3";
import React, { useState } from "react";
import Button from "./Button";


export default function List() {
  
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState("");

    function addTask() {
        if (input.trim() !== "") {
            setTasks([...tasks, input]); // Adds new task to the list            
            setInput(""); // Clears input after adding
            clickSound();
        }
    }

    function clickSound() {
        const audio = new Audio(click);
        audio.play();
    }

    function deleteTask(index) {
        setTasks(tasks.filter((_, i) => i !== index)); // Removes the task at the given index
        clickSound();
    }

    return (
        <div className="relative flex flex-col justify-between min-h-screen bg-[#fd8989] text-white px-4 py-20" id='list'>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-[VT323] text-center">
                Tasks
            </h1>
            <div className="flex justify-center items-center space-x-2">
                <input className="text-2xl px-2 py-2 pb-3 text-center text-white bg-transparent placeholder-gray rounded-lg pt-4 border-2"
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="Enter a task" 
                />

                <button onClick={addTask} className="hover:text-gray-300 transition duration-200">Add Task</button>
                </div>
                <ul className="w-full pl-110">
                    {tasks.map((task, index) => (
                        <li key={index} className="py-2 flex items-center">
                            <button onClick={() => deleteTask(index)} className="text-red-800 px-0.5 ml-3 w-7 h-8">x</button>
                            <span className="text-2xl break-words w-full">{task}</span> 
                        </li>
                    ))}
                </ul>
        </div>
    );
}

