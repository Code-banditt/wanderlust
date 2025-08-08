"use client";

import Image from "next/image";

export default function ContCrd({ handleSelect }) {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/*Europe*/}
      <div className="rounded-xl overflow-hidden bg-white">
        <Image
          src="https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg"
          width={400}
          height={100}
          alt=""
          className="h-40 w-full object-cover rounded-lg"
        />
        <div className="p-4">
          <p className="text-gray-400 text-xs mb-1">
            Europe boasts of 24 countries
          </p>
          <h3 className="font-semibold text-sm mb-2 leading-tight">
            Explore Europe: A Paradise of Technology, innovation, and Tradition
          </h3>
          <button
            onClick={() => handleSelect("Europe")}
            className="text-gray-600 border px-3 rounded-lg text-xs hover:underline cursor-pointer"
          >
            select
          </button>
        </div>
      </div>

      {/*Africa*/}
      <div className="rounded-xl overflow-hidden bg-white">
        <Image
          src="https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg"
          width={400}
          height={100}
          alt="Abuja"
          className="h-40 w-full object-cover rounded-lg"
        />
        <div className="p-4">
          <p className="text-gray-400 text-xs mb-1">
            Africa boasts of 54 countries
          </p>
          <h3 className="font-semibold text-sm mb-2 leading-tight">
            Explore Africa: A Paradise of Culture, Nature, and Architecture
          </h3>
          <button
            onClick={() => handleSelect("Africa")}
            className="text-gray-600 border px-3 rounded-lg text-xs hover:underline cursor-pointer"
          >
            select
          </button>
        </div>
      </div>

      {/*Americas*/}
      <div className="rounded-xl overflow-hidden bg-white">
        <Image
          src="https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg"
          width={400}
          height={100}
          alt="New York City"
          className="h-40 w-full object-cover rounded-lg"
        />
        <div className="p-4">
          <p className="text-gray-400 text-xs mb-1">
            The Americas boasts of 32 countries
          </p>
          <h3 className="font-semibold text-sm mb-2 leading-tight">
            Explore The Americas: A Blend of Diversity, Adventure, and Heritage
          </h3>
          <button
            onClick={() => handleSelect("Americas")}
            className="text-gray-600 border px-3 rounded-lg text-xs hover:underline cursor-pointer"
          >
            select
          </button>
        </div>
      </div>

      {/*Asia*/}
      <div className="rounded-xl overflow-hidden bg-white">
        <Image
          src="https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg"
          width={400}
          height={100}
          alt="Singapore"
          className="h-40 w-full object-cover rounded-lg"
        />
        <div className="p-4">
          <p className="text-gray-400 text-xs mb-1">
            Asia boasts of 48 countries
          </p>
          <h3 className="font-semibold text-sm mb-2 leading-tight">
            Explore Asia: A Tapestry of Cultures, Landscapes, and Innovation
          </h3>
          <button
            onClick={() => handleSelect("Asia")}
            className="text-gray-600 border px-3 rounded-lg text-xs hover:underline cursor-pointer"
          >
            select
          </button>
        </div>
      </div>
    </div>
  );
}
