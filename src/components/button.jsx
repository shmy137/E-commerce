import React from "react";
import { twMerge } from "tailwind-merge";

function Button({ onClick, children, className = "" }) {
  const defaultStyles =
    "px-6 py-3 rounded-lg font-semibold bg-primary text-white hover:opacity-90 transition-all duration-200 cursor-pointer";

  return (
    <button onClick={onClick} className={twMerge(defaultStyles, className)}>
      {children}
    </button>
  );
}

export default Button;
