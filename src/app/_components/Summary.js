"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import SimpleAccordion from "./SimpleAccordion";
import { getUserCurrency } from "@/app/_Helper Functions/userCurrency";
import { formatCurrency } from "@/app/_Helper Functions/formattCurrency";
import { useBudgetHandlers } from "../mutations/useBudget";
import dayjs from "dayjs";

const fetchTrip = async (tripId) => {
  const res = await fetch(`/api/trips/${tripId}`);
  if (!res.ok) throw new Error("Failed to fetch trip");
  const data = await res.json();
  return data.trip;
};

const headerImages = [
  "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
  "https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function TripSummary({
  countryName = "Destination",
  countryImage = headerImages[0],
  tripId,
  totalCost = 0,
}) {
  const {
    data: trip,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trip", tripId],
    queryFn: () => fetchTrip(tripId),
    enabled: !!tripId,
  });

  const { increaseBudget, decreaseBudget } = useBudgetHandlers(trip);
  const [currency, setCurrency] = useState("USD");

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const currentImage = headerImages[currentImageIndex];

  // Rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % headerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getUserCurrency().then((curr) => setCurrency(curr));
  }, []);

  if (isLoading) return <p className="text-center py-6">Loading trip...</p>;
  if (error)
    return <p className="text-center py-6 text-red-600">Error loading trip.</p>;

  return (
    <div className="max-w-6xl mx-auto bg-white overflow-hidden mb-16 mt-12">
      {/* Header Image */}
      <div className="relative h-72 w-full transition-all duration-500">
        <Image
          key={currentImage}
          src={currentImage}
          alt={countryName}
          fill
          className="object-cover transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white drop-shadow-xl">
          <h2 className="text-4xl font-bold">{trip?.destination?.name} trip</h2>
          <p className="text-sm font-light">This is an overview of your trip</p>
        </div>
      </div>

      {/* Trip Info */}
      <div className="p-8 space-y-10">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-800 tracking-tight">
            Trip Overview
          </h3>
        </div>
      </div>

      <SimpleAccordion trip={trip} tripId={tripId} />

      {/* Budget Summary */}
      <div className="mt-10 bg-white/90 border p-6">
        <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          Budget
        </h4>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-gray-700 text-sm">
            Total Trip Cost:{" "}
            <span className="text-blue-600 font-bold">
              {formatCurrency(totalCost, currency)}
            </span>
          </div>
          <div className="text-gray-700 text-sm">
            Your Budget:{" "}
            <span className="text-green-600 font-bold">
              {formatCurrency(trip.userBudget, currency)}
            </span>
          </div>
        </div>

        <div className="mt-4 flex gap-4">
          <button
            onClick={increaseBudget}
            className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-green-600"
          >
            Increase Budget
          </button>
          <button
            onClick={decreaseBudget}
            className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-red-600"
          >
            Decrease Budget
          </button>
        </div>
      </div>
    </div>
  );
}
