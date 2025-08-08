import DailyAccordion from "./DailyAccordion";

export default function DailySchedule({ tripId, attractions, countryInfo }) {
  return (
    <div className="mt-6 mb-4 p-4">
      <div className="mb-6 flex items-center gap-3">
        <div className="bg-blue-100 text-blue-600 rounded-full p-2"></div>
        <h2 className="text-lg font-bold text-gray-800 tracking-tight">
          Airports
        </h2>
      </div>

      <DailyAccordion tripId={tripId} countryInfo={countryInfo} />
    </div>
  );
}
