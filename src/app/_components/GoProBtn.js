"use client";

import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Dialog } from "@headlessui/react"; // Optional: using Headless UI

export default function GoProModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleProceedToPayment = async () => {
    // Patch request or redirect to payment gateway
    console.log("Proceed to payment");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg shadow transition-colors duration-200 cursor-pointer flex items-center gap-2"
      >
        Get Premium <FaStar />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 backdrop-blur-sm px-4 w-screen h-screen">
          <div className="flex w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-xl h-full">
            {/* Left Image */}
            <div
              className="hidden md:block md:w-1/2 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.pexels.com/photos/7974879/pexels-photo-7974879.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260')",
              }}
            />

            {/* Premium Info */}
            <div className="w-full md:w-1/2 p-6 bg-gradient-to-b from-[#121212] via-[#1d1d1d] to-[#000000] text-white">
              <div className="text-left flex flex-col justify-between">
                <h2 className="text-2xl font-bold mb-2">Go Premium</h2>
                <p className="text-gray-300 mb-4 text-sm">
                  ₦1,500/month – unlock everything
                </p>

                <ul className="text-sm mb-6 space-y-3 text-gray-200">
                  <li className="flex items-start gap-2">
                    ✅ Unlimited trip planning
                  </li>
                  <li className="flex items-start gap-2">
                    ✅ Save places and attractions
                  </li>
                  <li className="flex items-start gap-2">
                    ✅ Early access to new features
                  </li>
                  <li className="flex items-start gap-2">
                    ✅ AI-powered itinerary builder
                  </li>
                </ul>

                <button
                  onClick={handleProceedToPayment}
                  className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg"
                >
                  Continue with Monthly
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-4 block text-sm text-gray-400 hover:underline mx-auto"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
