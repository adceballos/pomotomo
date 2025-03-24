import { useState } from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import click from "../assets/click.mp3";

function clickSound() {
    const audio = new Audio(click);
    audio.play();
}

export default function Navbar() {
  return (
    <div className="p-4 bg-[#ff7f7f] text-white border-b-2 flex justify-between">
        <p className="mt-2 text-lg">Home</p>
    </div>
  );
}