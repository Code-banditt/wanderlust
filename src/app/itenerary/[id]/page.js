"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Button from "@/app/_components/Button";
import Reservations from "@/app/_components/reservations";
import Attractions from "@/app/_components/Attractions";
import TripSummary from "@/app/_components/Summary";
import Friends from "@/app/_components/FriendsList";
import Map from "@/app/_components/Map";
import HeaderMinimal from "@/app/_components/HeaderMinimal";
import { toast } from "sonner";

import EventComponent from "@/app/_components/EventComponent";
import BookingIcons from "@/app/_components/flights";
import { useLoading } from "@/app/_components/Loading";
import { useEffect } from "react";
import Finish from "@/app/_components/FinishBtton";

//
const fetchTrip = async (tripId) => {
  const res = await fetch(`/api/trips/${tripId}`);
  const data = await res.json();
  return data.trip;
};

const fetchLocationData = async (destinationName) => {
  const countryRes = await fetch(
    `/api/countries/${encodeURIComponent(destinationName)}`
  );
  const countryData = countryRes.ok ? await countryRes.json() : null;

  if (!countryData || Object.keys(countryData).length === 0) {
    const cityRes = await fetch(
      `/api/cities/${encodeURIComponent(destinationName)}`
    );
    const cityData = cityRes.ok ? await cityRes.json() : null;
    return { countryInfo: cityData, cityInfo: cityData };
  } else {
    return { countryInfo: countryData, cityInfo: null };
  }
};

// Main component for trip details page
// Fetches trip and location data, displays them with various components
export default function TripDetails() {
  const { id: tripId } = useParams();
  const { setLoading } = useLoading();

  const {
    data: trip,
    isLoading: tripLoading,
    error: tripError,
  } = useQuery({
    queryKey: ["trip", tripId],
    queryFn: () => fetchTrip(tripId),
    enabled: !!tripId,
  });

  const {
    data: locationData,
    isLoading: locationLoading,
    error: locationError,
  } = useQuery({
    queryKey: ["location", trip?.destination?.name],
    queryFn: () => fetchLocationData(trip?.destination.name),
    enabled: !!trip?.destination?.name,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (locationData) => {
      if (!locationData.countryInfo && !locationData.cityInfo) {
        toast.error("No location data found for this trip.");
      }
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const { countryInfo, cityInfo } = locationData || {};

  useEffect(() => {
    if (tripLoading || !trip) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [tripLoading, trip, setLoading]);

  useEffect(() => {
    if (locationLoading || !locationData) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [locationLoading, locationData, setLoading]);

  if (tripError) return <p>Error loading trip: {tripError.message}</p>;

  // flight details

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] min-h-screen w-full bg-white relative">
      <div className="absolute top-0 left-0 right-0 z-50">
        <HeaderMinimal />
      </div>

      <div className="overflow-y-auto w-full max-h-screen space-y-6 font-sans text-black relative">
        <div className="relative w-full h-[500px] text-white font-sans">
          {countryInfo?.images?.[0]?.url && (
            <Image
              src={countryInfo?.images[0].url}
              alt={`Trip to ${trip.destination.name}`}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 z-0"
            />
          )}
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="relative z-20 h-full flex flex-col justify-center px-12">
            <h1 className="text-5xl font-extrabold mb-4">
              {trip?.destination?.name.toUpperCase()}
            </h1>
            <p className="max-w-2xl text-lg text-gray-100">
              The Big Apple is a melting pot of different cultures...
            </p>
            <div className="mt-6  bg-white/90 backdrop-blur-md rounded-xl flex items-center gap-4 px-6 py-4 w-fit shadow-md">
              <div className="text-black text-sm">
                <p className="font-medium">When is your trip?</p>
                <input
                  type="text"
                  placeholder={`${trip?.date?.startDate} - ${trip?.date?.endDate}`}
                  className="bg-transparent text-sm border-none outline-none"
                />
              </div>
              <Button className="bg-gray-900 text-white hover:bg-red-600 px-6 py-2 rounded-full">
                Start planning
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center flex-wrap gap-4 p-4">
          <Friends trip={trip} />
        </div>

        {/* Trip icons Section */}
        <div className="flex items-center justify-between p-4 bg-white ">
          <BookingIcons
            city={cityInfo?.destination?.name}
            country={trip?.destination?.name}
          />
        </div>

        {/* Sections */}
        <Reservations countryData={countryInfo} tripId={tripId} />
        <Attractions
          countryinfo={countryInfo}
          cityData={cityInfo}
          tripId={tripId}
        />
        <div>
          <h2 className="text-lg font-normal mb-4 p-2">Events</h2>
          <EventComponent countryInfo={countryInfo} />
        </div>

        <TripSummary tripId={tripId} />
        <div className="flex justify-end p-4">
          <Finish />
        </div>
      </div>

      {/* Right – Map */}
      <div className="bg-gray-200 h-full sticky top-0 hidden lg:flex items-center justify-center rounded-l-2xl shadow-inner">
        <Map countryInfo={countryInfo} />
      </div>
    </div>
  );
}
export const dynamic = "force-dynamic";
