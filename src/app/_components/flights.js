import Link from "next/link";

export default function BookingCards({ city, country }) {
  const cityQuery = encodeURIComponent(`${city} ${country}`);

  return (
    <div className="flex flex-col space-y-4 w-full">
      <h2 className="text-md font-semibold text-orange-800">
        Find flights & hotels
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
        {/* Hotels Card */}
        <div
          className="bg-white rounded-2xl shadow-md border p-6 hover:shadow-lg transition-all"
          style={{
            backgroundImage:
              'url("https://cdn.pixabay.com/photo/2021/12/11/07/59/hotel-6862159_1280.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "200px", // or whatever height you want
          }}
        >
          <h3 className="text-xl font-semibold text-white  mb-3">
            Browse Hotels
          </h3>
          <div className="flex items-center text-sm text-white mb-4 font-bold">
            <svg
              className="w-4 h-4 mr-2 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                d="M17 20h5v-2a4 4 0 00-4-4h-1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="7" r="4" />
              <path
                d="M15 21v-2a4 4 0 00-3-3.87"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 21v-2a4 4 0 013-3.87"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Recommended stays in {city}, {country}
          </div>
          <Link
            href={`https://www.tripadvisor.com/Search?q=${cityQuery}+hotels`}
            className="px-4 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-blue-700"
          >
            Find Hotels
          </Link>
        </div>

        {/* Flights Card */}
        <div
          className="bg-white rounded-2xl shadow-md border p-6 hover:shadow-lg transition-all"
          style={{
            backgroundImage:
              'url("https://cdn.pixabay.com/photo/2020/02/27/20/47/airplane-4885803_1280.jpg")',
            backgroundSize: "cover",
          }}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Find Flights
          </h3>
          <div className="flex items-center text-sm text-gray-600 mb-4 font-bold">
            <svg
              className="w-4 h-4 mr-2 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M10.18 9" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M10.18 9l-6.36 2.12a1 1 0 000 1.76L10.18 15m0 0l-1.18 4.18a1 1 0 001.47 1.09l4.71-2.36m-5-2.91l5 2.91"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.18 15L20 10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Flights available to {country}
          </div>
          <Link
            href={`https://www.google.com/flights?hl=en#flt=from.${city}-to.${country}`}
            className="px-4 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-blue-700"
          >
            Find Flights
          </Link>
        </div>
      </div>
    </div>
  );
}
