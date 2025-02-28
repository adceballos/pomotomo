import { useState } from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import AuthModal from './AuthModal';
import click from "../assets/click.mp3";

function clickSound() {
    const audio = new Audio(click);
    audio.play();
}

export default function Navbar() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="p-4 bg-[#ff7f7f] text-white border-b-2 flex justify-between">
        <p className="mt-2 text-lg">Home</p>
      <button 
        className="p-2 text-white hover:text-gray-200 relative"
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