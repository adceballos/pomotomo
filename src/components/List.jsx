import click from "../assets/click.mp3";
import React, { useState } from "react";

export default function List({ isOpen, setIsOpen }) { // Receive props
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState("");

    function addTask() {
        if (input.trim() !== "") {
            setTasks([...tasks, input]);
            setInput("");
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
        <div className="relative">
            {/* Sidebar */}
            <div 
                className={`fixed top-24 left-5 h-180 w-64 bg-[#ff7f7f] rounded-2xl border text-white shadow-xl transition-transform duration-300 ${
                    isOpen ? "translate-x-0" : "-translate-x-100"
                }`}
            >
                <div className="p-4">
                    <input
                        className="w-full text-xl px-2 py-2 text-center text-white bg-transparent placeholder-gray rounded-lg border-2"
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter a task..."
                    />
                    <button
                        onClick={addTask}
                        className="w-full mt-2 bg-white text-red-500 py-2 rounded-md"
                    >
                        Add Task
                    </button>
                </div>

                {/* Task List */}
                <ul className="p-4 space-y-2 overflow-y-auto max-h-[70vh]">
                    {tasks.map((task, index) => (
                        <li
                            key={index}
                            className="flex gap-x-3 items-center border text-lg text-white px-3 py-2 rounded-md"
                        >
                            <button
                                onClick={() => deleteTask(index)}
                                className="text-red-800 hover:text-red-600"
                            >
                                x
                            </button>
                            {task}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
