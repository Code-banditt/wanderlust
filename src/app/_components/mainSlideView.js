"use client";
import React from "react";

export default function TopDestinations() {
  const destinations = [
    {
      name: "Kyoto",
      image:
        "https://images.pexels.com/photos/14695663/pexels-photo-14695663.jpeg",
    },
    {
      name: "New York City",
      image: "https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg",
    },
    {
      name: "Paris",
      image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg",
    },
    {
      name: "Los Angeles",
      image:
        "https://images.pexels.com/photos/2448749/pexels-photo-2448749.jpeg",
    },
    {
      name: "San Francisco",
      image: "https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg",
    },
  ];

  return (
    <section className="px-4 py-6">
      <h3 className="text-[#1C160C] text-lg font-bold leading-tight tracking-[-0.015em] pb-2">
        Top Destinations
      </h3>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
        {destinations.map((dest) => (
          <div key={dest.name} className="flex flex-col gap-3 pb-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl shadow"
              style={{ backgroundImage: `url(${dest.image})` }}
            />
            <p className="text-[#1C160C] text-base font-medium leading-normal text-center">
              {dest.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
