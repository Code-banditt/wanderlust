"use client";

export default function Button({ children, onClick, className = "" }) {
  return (
    <button
      className={`flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition-all duration-200 active:scale-95 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children || "Save"}
    </button>
  );
}
