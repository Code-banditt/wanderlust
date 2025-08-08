// components/Dropdown.tsx (or include directly in Header)
"use client";

import Link from "next/link";

export default function Dropdown() {
  return (
    <div className="flex items-center gap-4">
      <div className="relative group inline-block">
        <button className="text-[#1C160C] font-semibold py-2 px-4 rounded inline-flex items-center hover:bg-[#f4efe6] transition">
          <span>Destinations</span>
          <svg
            className="fill-current h-4 w-4 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M5.516 6.548L10 11.03l4.484-4.482 1.06 1.06L10 13.15 4.456 7.608z" />
          </svg>
        </button>
        <ul className="absolute z-10 hidden group-hover:block bg-white shadow-lg rounded-md py-2 min-w-[180px]">
          <li>
            <Link
              href="/Explore"
              className="block px-4 py-2 text-sm text-[#1C160C] hover:bg-[#f4efe6]"
            >
              Europe
            </Link>
          </li>
          <li>
            <Link
              href="/Explore"
              className="block px-4 py-2 text-sm text-[#1C160C] hover:bg-[#f4efe6]"
            >
              Asia
            </Link>
          </li>
          <li>
            <Link
              href="/Explore"
              className="block px-4 py-2 text-sm text-[#1C160C] hover:bg-[#f4efe6]"
            >
              Africa
            </Link>
          </li>
        </ul>
      </div>

      {/* Additional dropdown for another category, if needed */}

      <div className="relative group inline-block">
        <button className="text-[#1C160C] font-semibold py-2 px-4 rounded inline-flex items-center hover:bg-[#f4efe6] transition">
          <span>Travel guides</span>
          <svg
            className="fill-current h-4 w-4 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M5.516 6.548L10 11.03l4.484-4.482 1.06 1.06L10 13.15 4.456 7.608z" />
          </svg>
        </button>
        <ul className="absolute z-10 hidden group-hover:block bg-white shadow-lg  rounded-md py-2 min-w-[180px]">
          <li>
            <Link
              href="/blog"
              className="block px-4 py-2 text-sm text-[#1C160C] hover:bg-[#f4efe6]"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/Explore"
              className="block px-4 py-2 text-sm text-[#1C160C] hover:bg-[#f4efe6]"
            >
              Asia
            </Link>
          </li>
          <li>
            <Link
              href="/Explore"
              className="block px-4 py-2 text-sm text-[#1C160C] hover:bg-[#f4efe6]"
            >
              Africa
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
