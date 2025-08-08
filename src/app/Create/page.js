"use client";
import { useState } from "react";
import { CalendarDays, MapPin, FileText, Users } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import HeaderMinimal from "../_components/HeaderMinimal";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { createTrip } from "../store/tripSlice";
import { toast } from "sonner";

import DestinationInput from "../_components/DestinationDropD.js";

export default function CreateTripPage() {
  const [destination, setDestination] = useState(null);
  const [image, setImage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userBudget, setUserBudget] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  const { loading, error, currentTrip } = useSelector((state) => state.trip);

  const today = new Date().toISOString().split("T")[0];

  const formattedStart = Number(startDate.replace(/-/g, ""));
  const formattedEnd = Number(endDate.replace(/-/g, ""));

  //create trip handler and email notification
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreating(true); // Start loading

    const tripData = {
      destination: { name: destination, image },
      date: {
        startDate: formattedStart,
        endDate: formattedEnd,
      },
      userBudget: Number(userBudget),
    };

    const resultAction = await dispatch(createTrip(tripData));
    console.log("🔥 resultAction", resultAction);

    if (createTrip.fulfilled.match(resultAction)) {
      const createdTrip = resultAction.payload;
      toast.success("Trip Created");

      try {
        await fetch("/api/email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: session?.user?.email,
            subject: "🎉 Your Wanderlust Trip is Booked!",
            message: `Hey ${session?.user?.name || "Traveler"}, your trip to ${
              createdTrip.destination.name
            } from ${startDate} to ${endDate} is officially created. Get ready to explore!`,
          }),
        });
        console.log("📧 Email sent");
      } catch (err) {
        console.error("❌ Failed to send email", err);
      }

      router.push(`/itenerary/${createdTrip?.id}`);
    } else {
      console.error("❌ Trip creation failed:", resultAction);
      toast.error(resultAction.payload || "Error creating trip");
    }

    setIsCreating(false); // Stop loading
  };
  const handleDestinationSelect = (item) => {
    setDestination(item.name);

    // optionally load an image here or from item if available
    // if you're passing images in the dropdown result
    if (item.image) {
      setImage(item.image);
      console.log("Selected destination:", item);
    } else {
      // fallback to load it later or default
      setImage("/default.jpg");
    }

    console.log("Selected:", item);
  };

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>You must be logged in</p>;

  return (
    <>
      <div className="relative min-h-screen overflow-hidden">
        {/* Zooming Background */}
        <div
          className="absolute inset-0 bg-cover bg-center animate-zoom-slow scale-110"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10">
          <HeaderMinimal />

          <div className="max-w-4xl mx-auto px-4 py-10">
            {/* Header */}
            <div className="mb-10 text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-200 to-white text-transparent bg-clip-text">
                🧳 Plan Your Trip
              </h1>
              <p className="text-gray-100 mt-2">
                Customize every detail of your next unforgettable journey.
              </p>
            </div>
            {/* Form Container */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
            >
              {/* Destination */}
              <div className="w-full">
                <DestinationInput onSelect={handleDestinationSelect} />
              </div>

              {/* Dates */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-gray-600" />
                      Start Date
                    </span>
                  </label>
                  <input
                    required
                    type="date"
                    name="startDate"
                    min={today}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-gray-600" />
                      End Date
                    </span>
                  </label>
                  <input
                    required
                    type="date"
                    name="endDate"
                    value={endDate}
                    min={today}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>

              {/* Travelers */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  <span className="inline-flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    Trip budget
                  </span>
                </label>
                <input
                  type="number"
                  min="1"
                  name="travelers"
                  value={userBudget}
                  onChange={(e) => setUserBudget(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isCreating}
                  className={`w-full bg-gradient-to-r from-gray-600 to-gray-800 text-white font-semibold py-3 rounded-xl transition cursor-pointer ${
                    isCreating
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:opacity-90"
                  }`}
                >
                  {isCreating ? "Creating..." : "Create Trip"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
