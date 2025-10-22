"use client";

import Image from "next/image";
import Link from "next/link";

const destinations = [
  {
    name: "Europe",
    image:
      "https://images.unsplash.com/photo-1473951574080-01fe45ec8643?q=80&w=1204&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    review: "“Romantic streets, rich culture, and timeless beauty.”",
  },
  {
    name: "Polar",
    image:
      "https://images.unsplash.com/photo-1587125507575-7451184560a6?q=80&w=1110&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    review: "“Breathtaking glaciers and serene silence.”",
  },
  {
    name: "Africa",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1168&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    review: "“Safari adventure like no other. Pure wild.”",
  },
  {
    name: "Middle Asia",
    image:
      "https://images.unsplash.com/photo-1585735661174-a68d3ff2ca01?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    review: "“Hidden gems of ancient lands and stories.”",
  },
  {
    name: "North America",
    image:
      "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    review: "“Endless road trips and bustling cities.”",
  },
  {
    name: "Balkan",
    image:
      "https://images.unsplash.com/photo-1504730461252-26343bc973f1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tours: 3,
    review: "“Underrated paradise with stunning coastlines.”",
  },
];

export default function DestinationGrid() {
  return (
    <div className="grid grid-cols-3 max-w-6xl mx-auto  p-4">
      <h3 className="text-3xl font-semibold text-[#3abff8] col-span-3 mb-4">
        From Our Blog
      </h3>
      {destinations.map((dest, index) => (
        <div
          key={index}
          className={`relative group h-64 overflow-hidden ${
            dest.name === "North America" || dest.name === "Balkan"
              ? "col-span-3 md:col-span-2"
              : ""
          }`}
        >
          <Image
            width={400}
            height={400}
            src={dest.image}
            alt={dest.name}
            className="w-full h-full object-cover"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition z-10 pointer-events-none" />

          {/* Text content */}
          <div className="absolute inset-0 flex flex-col justify-end p-4 text-white z-20">
            <h2 className="text-2xl font-bold">{dest.name}</h2>

            {dest.name === "Balkan" && (
              <div className="mt-1">
                <span className="inline-block bg-white text-black text-xs px-2 py-0.5 rounded">
                  {dest.tours} Tours
                </span>
                <p className="text-sm mt-2">{dest.description}</p>
              </div>
            )}
          </div>

          {/* Review hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center px-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
            <p className="bg-white/20 backdrop-blur-md text-white text-sm p-3 rounded shadow-md">
              {dest.review}
            </p>
          </div>
        </div>
      ))}

      <Link
        href="/blog"
        className="inline-flex items-center text-black underline text-sm mt-1 cursor-pointer"
      >
        Read more →
      </Link>
    </div>
  );
}
