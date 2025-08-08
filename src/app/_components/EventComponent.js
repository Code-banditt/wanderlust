"use client";

import Image from "next/image";
import React, { useState } from "react";

export default function EventComponent({ countryInfo }) {
  const events = countryInfo?.events || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const onNext = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerPage >= events.length ? 0 : prev + itemsPerPage
    );
  };

  const onPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0
        ? Math.max(events.length - itemsPerPage, 0)
        : prev - itemsPerPage
    );
  };

  const visibleEvents = events.slice(currentIndex, currentIndex + itemsPerPage);

  if (!events.length) {
    return <p className="text-center text-gray-500">No events found.</p>;
  }

  return (
    <div className="relative w-full flex items-center justify-center">
      {/* Prev Button */}
      <button
        onClick={onPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow hover:bg-gray-100 transition z-10"
        aria-label="Previous"
      >
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Event Cards */}
      <div className="w-full max-w-4xl px-4 grid grid-cols-2 md:grid-cols-3 gap-6">
        {visibleEvents.map((event, index) => {
          const [month, day] = event.date?.split(" ") || ["", ""];
          return (
            <div
              key={event.link + index}
              className="bg-white rounded-3xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={event.thumbnail}
                  alt={event.title}
                  width={100}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-3xl"
                />
                <div className="absolute top-3 left-3 bg-white rounded-xl px-2 py-1 text-center shadow-sm">
                  <p className="text-xs font-bold text-gray-700 uppercase">
                    {month}
                  </p>
                  <p className="text-xl font-extrabold text-gray-900">{day}</p>
                </div>
              </div>

              <div className="p-4 space-y-1">
                <p className="text-sm text-gray-400">📍 {countryInfo?.name}</p>
                <h3 className="text-lg font-bold text-gray-800">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {event.description}
                </p>
                <p className="text-xs text-gray-500 italic mt-1">
                  🎟️{" "}
                  <a href={event.link} className="underline" target="_blank">
                    Event Link
                  </a>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow hover:bg-gray-100 transition z-10"
        aria-label="Next"
      >
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
