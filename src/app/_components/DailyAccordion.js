import Image from "next/image";
import ViewMoreWrapper from "../_Helper Functions/ViewMore";

export default function DailyAccordion({ tripId, countryInfo }) {
  return (
    <div className="space-y-4 flex flex-wrap gap-6">
      <ViewMoreWrapper initialCount={2}>
        {countryInfo?.cityData && (
          <div className="flex items-center gap-6 mb-6">
            {/* Image */}
            <div className="flex-shrink-0">
              <Image
                src={countryInfo.cityData.image || ""}
                alt="Day 1"
                className="w-32 h-32 object-cover rounded-xl border border-gray-300"
                width={128}
                height={128}
              />
            </div>

            {/* Text Container */}
            <div className="relative flex-1 bg-gray-100 p-5 rounded-xl">
              <div className="absolute -top-3 -left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                Airports
              </div>

              <span className="text-gray-700 text-sm flex flex-wrap gap-4">
                {countryInfo.cityData.airports.map((airport, index) => (
                  <span
                    key={index}
                    className="text-white bg-black rounded-md hover:text-gray-300 py-0.5 px-2 transition duration-200 text-xs"
                  >
                    {airport.name}
                  </span>
                ))}
              </span>
            </div>
          </div>
        )}

        {/* Additional days can be added here */}
      </ViewMoreWrapper>
    </div>
  );
}
