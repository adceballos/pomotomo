import { useState } from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import AuthModal from "./AuthModal"; // Ensure correct import
import click from "../assets/click.mp3";

function clickSound() {
    const audio = new Audio(click);
    audio.play();
}

export default function Navbar({ isOpen, setIsOpen }) {
  const [isAuthOpen, setIsAuthOpen] = useState(false); // Re-add auth modal state

  return (
    <div className="p-4 bg-[#ff7f7f] text-white border-b-2 flex gap-x-5">
      <p className="mt-2 text-lg">Home</p>

      {/* Task List Toggle Button */}
      <button 
        className="p-2 text-lg text-white hover:text-gray-200"
        onClick={() => {
            clickSound();
            setIsOpen(!isOpen);
        }}
      >
        {isOpen ? "Close Tasks" : "Open Tasks"}
      </button>

      {/* User Icon & Auth Modal Button */}
      <button 
        className="p-2 text-white hover:text-gray-200"
        onClick={() => {
            clickSound();
            setIsAuthOpen(true);
        }}
      >
        <UserIcon className="w-6 h-6" />
      </button>

      {/* Show Auth Modal if Open */}
      {isAuthOpen && <AuthModal close={() => setIsAuthOpen(false)} />}
    </div>
  );
}
