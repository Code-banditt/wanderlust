"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useFetchTrips } from "@/app/mutations/useFetchTrips";
import { useDeleteTrip } from "../mutations/useDeleteTrip";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import WanderlustLoader from "./wanderlustLoder";
import ConfirmModal from "./reusableModal";

export default function TripsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const { data: trips = [], isLoading, error } = useFetchTrips();
  const { mutate: deleteTrip } = useDeleteTrip();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState(null);

  const handleDeleteClick = (tripId) => {
    setSelectedTripId(tripId);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedTripId) {
      deleteTrip(selectedTripId);
    }
  };

  // Optional helper to parse number to Date
  const parseDate = (num) => {
    if (!num) return null;
    const str = num.toString();
    const year = +str.slice(0, 4);
    const month = +str.slice(4, 6) - 1; // 0-based
    const day = +str.slice(6, 8);
    return new Date(year, month, day);
  };
  // Format date to readable string
  const formatTripDates = (trip) => {
    const parseDate = (num) => {
      if (!num) return null;
      const str = num.toString();
      const year = +str.slice(0, 4);
      const month = +str.slice(4, 6) - 1;
      const day = +str.slice(6, 8);
      return new Date(year, month, day);
    };

    const start = parseDate(trip.date?.startDate);
    const end = parseDate(trip.date?.endDate);

    const formattedStart = start?.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const formattedEnd = end?.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return { formattedStart, formattedEnd };
  };

  // Categorize trips based on dates
  const categorizedTrips = useMemo(() => {
    const now = new Date();

    const upcoming = [];
    const ongoing = [];
    const completed = [];

    trips.forEach((trip) => {
      const start = parseDate(trip.date?.startDate);
      const end = parseDate(trip.date?.endDate);

      if (start && end) {
        if (now < start) {
          upcoming.push(trip);
        } else if (now >= start && now <= end) {
          ongoing.push(trip);
        } else {
          completed.push(trip);
        }
      } else {
        upcoming.push(trip); // fallback if dates missing
      }
    });

    return { upcoming, ongoing, completed };
  }, [trips]);

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Hero Banner */}
      <div className="relative h-72 w-full">
        <Image
          src="https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Travel background"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold">Your Trips</h1>
          <p className="text-lg">Plan, track, and relive your adventures</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-6xl mx-auto mt-8 px-4 p-4">
        <div className="flex space-x-6 border-b pb-2 text-gray-700 font-medium">
          {["upcoming", "ongoing", "completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`capitalize pb-2 ${
                activeTab === tab
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500"
              }`}
            >
              {tab} trips
            </button>
          ))}
        </div>

        {/* Trip Cards */}
        {isLoading ? (
          <span className="text-center py-10">
            <WanderlustLoader />
          </span>
        ) : error ? (
          <p className="text-center py-10 text-red-500">
            Failed to load trips.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {categorizedTrips[activeTab]?.map((trip, index) => {
              const { formattedStart, formattedEnd } = formatTripDates(trip);
              return (
                <div
                  key={trip._id || index}
                  className="bg-white shadow overflow-hidden"
                >
                  <div className="p-4">
                    <Image
                      src={
                        trip.places?.[0]?.image ||
                        "https://images.unsplash.com/photo-1473625247510-8ceb1760943f?q=80&w=1111&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      }
                      alt={trip.places?.[0]?.name || "Trip Image"}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover mb-4"
                    />

                    <h3 className="text-lg font-semibold">
                      {trip.destination?.name || "Unknown"}
                    </h3>
                    <h3 className="text-xs text-blue-500 mb-2">
                      {formattedStart} - {formattedEnd}
                    </h3>

                    <span className="flex items-center justify-between text-xs text-gray-500  ">
                      <Link
                        href={`/itenerary/${trip.id}`}
                        className="text-sm text-gray-500 cursor-pointer hover:opacity-45"
                      >
                        Click for more details
                      </Link>
                      <FaTrash
                        className="text-red-500 cursor-pointer hover:opacity-75"
                        onClick={() => handleDeleteClick(trip.id)}
                      />
                    </span>
                  </div>
                </div>
              );
            })}

            {categorizedTrips[activeTab]?.length === 0 && (
              <span className="text-center col-span-full text-gray-500 py-6 flex flex-col gap-4 justify-center items-center">
                No {activeTab} trips.
                <Link
                  href={`/Create`}
                  className="text-blue-500 hover:underline"
                >
                  Create one +
                </Link>
              </span>
            )}
          </div>
        )}
      </div>
      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
