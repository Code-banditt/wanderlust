"use client";

import Image from "next/image";
import { useState } from "react";
import { useDeletePlaces } from "../mutations/useDeletePlaces";
import { useDeleteHotel } from "../mutations/useDeleteHotel";
export default function SimpleAccordion({ trip, tripId }) {
  const [openIndex, setOpenIndex] = useState(null);
  const { mutate: deletePlace } = useDeletePlaces(trip.id);
  const { mutate: deleteHotel } = useDeleteHotel();
  const accordionData = [
    {
      title: "Places you chose to Visit",
      items: trip?.places || [],
    },
    {
      title: "places you chose to Lodge",
      items: trip?.stay ? [trip.stay] : [],
    },
    {
      title: "Flights and Transportation",
      items: trip?.flight ? [trip.flight] : [],
    },
  ];

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {accordionData.map((section, index) => (
        <div key={index} className="border border-gray-200 overflow-hidden">
          <button
            onClick={() => toggle(index)}
            className="w-full text-left px-4 py-3 bg-white text-gray-800 font-medium hover:bg-gray-50 transition"
          >
            {section.title}
          </button>

          <div
            className={`px-4 grid grid-cols-3 overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? "max-h-96 py-3" : "max-h-0 py-0"
            }`}
          >
            {section.items.length === 0 ? (
              <p className="text-sm text-gray-500 italic">
                add {section.title}
              </p>
            ) : (
              section.items.map((item, i) => (
                <div key={i} className="mb-3">
                  {item.image && (
                    <Image
                      width={1280}
                      height={720}
                      src={item.image}
                      alt="preview"
                      className="w-32 h-20 object-cover rounded mt-1"
                    />
                  )}
                  <p className="text-sm text-gray-700 font-light">
                    {item.name || item.airline || item.location || "Unnamed"}
                  </p>
                  <button
                    onClick={() => deletePlace(item.name)}
                    className="text-red-600 text-xs font-semibold hover:underline mt- cursor-pointer"
                  >
                    - Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
