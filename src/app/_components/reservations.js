"use client";
import Image from "next/image";
import ViewMoreWrapper from "../_Helper Functions/ViewMore";
import Link from "next/link";
import { useAddHotel } from "../mutations/useAddHotel";
import { toast } from "sonner";

export default function Reservations({ countryData, tripId }) {
  const hotels = countryData?.tripAdvisorHotels || [];
  const { mutate: addHotel, isPending, error } = useAddHotel();

  const handleHotelSelect = (hotel) => {
    const stay = {
      name: hotel.name,
      image: hotel.image,
    };

    if (isPending) return;

    if (error) {
      toast.error("Error adding place:", error);
      return;
    }

    toast.success("Place added successfully!");
    addHotel({ tripId, stay });
  };

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-lg font-medium flex items-center gap-2">
        Suggested Hotels and lodges
        <svg
          width="20px"
          height="44px"
          viewBox="0 0 24 24"
          fill="red"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
              stroke="red"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
            <path
              d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
          </g>
        </svg>
      </h1>
      <ViewMoreWrapper initialCount={3}>
        {hotels.map((hotel, index) => (
          <div
            key={hotel.id || index}
            className="flex bg-white border rounded-xl overflow-hidden"
          >
            {/* Image Preview */}
            <div className="w-1/3 relative h-32 min-w-[120px]">
              <Image
                src={
                  hotel.image ||
                  "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg"
                }
                alt={hotel.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Hotel Info */}
            <div className="w-2/3 p-4 flex flex-col justify-between">
              <div>
                <h2 className="font-semibold text-lg">
                  {hotel.name || "No Suggestion available now"}
                </h2>
                <p className="text-sm text-gray-600">{hotel.address}</p>
              </div>

              <div className="mt-2 flex justify-between items-center">
                <span className="font-bold text-orange-500">
                  {hotel.price || "Price unavailable"}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleHotelSelect(hotel)}
                    className="text-sm bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800 transition"
                  >
                    Save Hotel
                  </button>
                  <Link
                    href={hotel.link || "#"}
                    className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </ViewMoreWrapper>
    </div>
  );
}
