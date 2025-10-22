"use client";

import Header from "./_components/header";
import Image from "next/image";
import ItineraryBuilder from "./_components/itenary";
import MainSlideView from "./_components/mainSlideView";
import Link from "next/link";
import YourTrips from "./_components/YourTrips";
import AboutWanderlust from "./_components/About";
import WanderlustFooter from "./_components/footer";
import DestinationGrid from "./_components/Grid";
import { motion } from "framer-motion";
import HeroSection from "./_components/herosect";

export default function Home() {
  return (
    <>
      <main
        className="relative flex min-h-screen flex-col bg-[#FFFFFF] justify-between overflow-x-hidden"
        style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
      >
        <div className="absolute top-0 left-0 right-0 z-20">
          <Header />
        </div>

        <HeroSection />

        {/* Top Destinations */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <MainSlideView />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <DestinationGrid />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <ItineraryBuilder />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <YourTrips />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <AboutWanderlust />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <WanderlustFooter />
        </motion.div>
      </main>
    </>
  );
}
