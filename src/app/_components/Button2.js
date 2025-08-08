"use client";

export default function PrimaryButton({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  icon: Icon,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 px-6 py-2 rounded-md bg-orange-700 hover:bg-orange-800 text-white font-semibold shadow transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {children}
      <span className="ml-2 inline-block animate-swing">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M5 8l5 5 5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <style jsx>{`
        @keyframes swing {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(6px);
          }
        }
        .animate-swing {
          animation: swing 1.2s infinite ease-in-out;
        }
      `}</style>
    </button>
  );
}
