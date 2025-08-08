import Image from "next/image";
import { FaPlay, FaHeart } from "react-icons/fa";
import NewAttraction from "../_components/newAtrractionList";

const destinations = [
  {
    image: "https://images.pexels.com/photos/416676/pexels-photo-416676.jpeg",
    title: "Oahu, Hawaii",
    tag: "Attraction",
    rating: 4.6,
    reviews: 32,
  },
  {
    image: "https://images.pexels.com/photos/247600/pexels-photo-247600.jpeg",
    title: "M±ana Ridge, HI",
    tag: "Attraction",
    rating: 4.6,
    reviews: 32,
  },
  {
    image: "https://images.pexels.com/photos/853199/pexels-photo-853199.jpeg",
    title: "Waikiki Beach",
    tag: "Surfing",
    rating: 4.8,
    reviews: 27,
  },
  {
    image: "https://images.pexels.com/photos/210205/pexels-photo-210205.jpeg",
    title: "Kualoa Ranch",
    tag: "Adventure",
    rating: 4.7,
    reviews: 19,
  },
];

export default function ExploreLayout() {
  return (
    <div className="flex flex-col md:flex-row bg-[#f5fdfa] min-h-screen w-full p-6 gap-10">
      {/* Middle Section */}
      <div className="flex-1 w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          List of France Cities
        </h2>
        <div className="bg-white p-6 rounded-xl mb-4 w-full">
          <div>
            <Image
              src={
                "https://images.pexels.com/photos/853199/pexels-photo-853199.jpeg"
              }
              alt="france"
              height={100}
              width={400}
              className="w-full h-72 object-cover rounded-md"
            />
          </div>
          <div className="bg-gray-100 p-4 rounded-xl mt-4">
            What&apos;s the best island in Hawaii for a family vacation? Include
            a comparison of all the islands. is a place included in the
            manuscript of a commen saave bien merci avouz, commot for road na
            men dey come
          </div>
          <div className="p-4">
            <NewAttraction />
          </div>
        </div>

        {/* Suggestions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4"></div>
      </div>

      {/* Right Sidebar */}
      <aside className="w-full max-w-xs md:max-w-sm space-y-8">
        {/* Travel differently */}
        <div className="relative w-full rounded-xl overflow-hidden">
          <img
            src="https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg"
            alt="Travel differently"
            className="w-full h-40 object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-black/20 rounded-xl" />
          <h3 className="absolute top-4 left-4 text-white text-xl font-semibold">
            Travel <br /> differently
          </h3>
          <button className="absolute bottom-4 right-4 bg-white text-gray-800 p-2 rounded-full shadow hover:scale-105 transition">
            <FaPlay />
          </button>
        </div>

        {/* Things to Do */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Cities</h4>
          <div className="grid grid-cols-2 gap-4">
            {destinations.map((dest, idx) => (
              <div
                key={idx}
                className="rounded-xl overflow-hidden bg-white relative group"
              >
                <img
                  src={dest.image}
                  alt={dest.title}
                  className="w-full h-24 object-cover"
                />
                <button className="absolute top-2 right-2 bg-white p-1 rounded-full text-gray-800 text-xs shadow">
                  <FaHeart className="text-pink-500" />
                </button>
                <div className="p-2">
                  <h5 className="text-sm font-semibold leading-tight text-gray-800">
                    {dest.title}
                  </h5>
                  <p className="text-[10px] text-gray-500">{dest.tag}</p>
                  <p className="text-[10px] text-yellow-600 font-medium">
                    ⭐ {dest.rating} ({dest.reviews})
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
