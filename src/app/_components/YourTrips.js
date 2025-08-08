"use client";

import { useFetchTrips } from "@/app/mutations/useFetchTrips";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1529171696861-bac785a44828?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function YourTrips() {
  const { data: trips = [], isLoading, error } = useFetchTrips();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Recent trips</h2>

      <div className="overflow-x-auto">
        <div className="flex gap-4">
          {isLoading && <p className="text-center">Loading...</p>}
          {error && (
            <p className="text-center text-red-500">Failed to load trips</p>
          )}

          {trips.map((trip) => (
            <div
              key={trip.id}
              className="min-w-[250px] max-w-[250px] relative overflow-hidden rounded-2xl shadow-md bg-white"
            >
              <Image
                src={trip.places?.[0]?.image || DEFAULT_IMAGE}
                alt={trip.places?.[0]?.name || "Destination"}
                width={250}
                height={140}
                className="w-full h-36 object-cover"
              />

              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 flex items-center justify-between">
                <div className="text-white font-semibold text-sm truncate">
                  {trip.destination?.name || "Unknown"}
                </div>
                <Link href={`/itenerary/${trip.id}`}>
                  <FaArrowRight className="text-white hover:opacity-75" />
                </Link>
              </div>
            </div>
          ))}

          {trips.length === 0 && !isLoading && (
            <div className="text-center text-gray-500 py-10">
              <Link href="/Create" className="text-blue-600 hover:underline">
                Create one now →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
