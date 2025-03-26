import React from "react";

export default function Button({ text, onClick, href }) {
  return (
    <a
      href={href}
      onClick={onClick} // Apply onClick directly to <a>
      className="active:scale-90 duration-150 px-6 text-3xl py-2 bg-black text-white rounded-md hover:bg-white cursor-pointer hover:text-black hover:border-white transition inline-block text-center"
    >
      {text}
    </a>
  );
}