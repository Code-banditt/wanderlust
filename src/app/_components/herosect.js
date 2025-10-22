"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Plane, MapPin } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0e0e0e] text-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://pikaso.cdnpk.net/private/production/2586490291/render.png?token=exp=1761350400~hmac=452a1ffb488ec77d44e6af2f3d6d563572e8f3a7050c12f5ccc8f802b237f18e&preview=1"
          alt="Wanderlust Background"
          fill
          priority
          className="object-cover brightness-[0.55]"
        />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70"></div>

      {/* Floating Icons */}
      <motion.div
        className="absolute top-20 right-10 text-white/40"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        <Plane size={40} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
        >
          Discover. Plan. <span className="text-[#3abff8]">Travel.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg md:text-2xl max-w-2xl text-gray-200 mb-8"
        >
          Your personal travel planner. Explore destinations, customize
          itineraries, and share adventures.
        </motion.p>

        {/* Search or CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="flex flex-col md:flex-row items-center gap-4"
        >
          <Link
            href="/Create"
            className="bg-[#3abff8] hover:bg-[#4cc9f0] text-black font-semibold px-6 py-3 rounded-full text-lg shadow-lg transition"
          >
            Plan Your Next Trip
          </Link>
          <button className="bg-transparent border border-gray-300 text-white px-6 py-3 rounded-full hover:bg-white/10 transition">
            Find Destinations
          </button>
        </motion.div>

        {/* Optional: Mini rating badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-2 rounded-full shadow-md flex items-center gap-2"
        >
          <MapPin size={16} className="text-[#3abff8]" />
          <p className="text-sm font-medium">
            Trusted by <strong>+10k travelers</strong>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
