import React from "react";

export default function Button({ text, onClick, href }) {
  return (
    <a
      href={href}
      onClick={onClick} // Apply onClick directly to <a>
      className="px-6 py-3 border-2 border-white text-white rounded-md bg-transparent hover:bg-white cursor-pointer hover:text-black transition inline-block text-center"
    >
      {text}
    </a>
  );
}