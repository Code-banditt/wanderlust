import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import RecommendationsCrd from "./RecommendationsCrd";
import { useAddPlace } from "@/app/mutations/useAddPlace";
import { toast } from "sonner";

export default function Attractions({ countryinfo, tripId }) {
  const scrollRef = useRef();
  const { mutate: addPlace, isPending, error } = useAddPlace();
  const existingPlaces = countryinfo?.images || [];

  const scroll = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = 320; // ~1 card width + gap
    current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleHotelSelect = (img, tags) => {
    const place = {
      name: img.tags?.split(" ").slice(0, 3).join(" ") || "Unknown",
      image: img.url,
    };

    const isDuplicate = existingPlaces.some((p) => p?.name === place.name);

    if (isDuplicate) {
      toast.error("Place already added!");
      return;
    }

    if (isPending) return; // Prevent multiple clicks

    if (error) {
      toast.error("Error adding place:", error);
      return;
    }

    toast.success("Place added successfully!");
    addPlace({ tripId, place });
    // 🔥 triggers the PATCH call
  };

  return (
    <div className="mt-6 w-full p-4">
      <h2 className="text-lg font-medium text-gray-800 mb-3">
        Places to Visit
      </h2>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow rounded-full hover:bg-gray-100"
        >
          <FaChevronLeft className="text-gray-700" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex flex-nowrap overflow-x-auto scroll-smooth scrollbar-hide gap-4 px-4"
          style={{ scrollBehavior: "smooth" }}
        >
          {countryinfo?.images?.map((img) => (
            <div key={img.id} className="flex-shrink-0 w-[300px]">
              <RecommendationsCrd
                image={img}
                countryinfo={countryinfo}
                onselect={() => handleHotelSelect(img)}
              />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow rounded-full hover:bg-gray-100"
        >
          <FaChevronRight className="text-gray-700" />
        </button>
      </div>
    </div>
  );
}
