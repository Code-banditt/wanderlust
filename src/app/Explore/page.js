"use client";

import {
  Search,
  Calendar,
  Map,
  Bookmark,
  Globe,
  MessageCircle,
  LogOut,
  BookOpen,
  Heart,
  User,
} from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCountries, setSelectedContinent } from "../store/ContinentSlice";
import ContCrd from "../_components/ContinentCrds";

import { useRouter } from "next/navigation";
import HeaderMinimal from "../_components/HeaderMinimal";

export default function ExplorePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { countriesByContinent, selectedContinent, status } = useSelector(
    (state) => state.continent
  );

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const handleSelect = (continent) => {
    dispatch(setSelectedContinent(continent));
  };

  return (
    <>
      <div>
        <HeaderMinimal />
      </div>

      <div className="flex min-h-screen bg-[#f5f7fa] font-sans">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col p-6">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-full font-bold text-lg">
              W
            </div>
            <h1 className="text-xl font-bold">WanderLust</h1>
          </div>
          <nav className="flex flex-col gap-6 text-gray-700 text-sm">
            <a href="#" className="flex items-center gap-3 hover:text-blue-600">
              <MessageCircle size={18} /> Chat
            </a>

            <a href="#" className="flex items-center gap-3 hover:text-blue-600">
              <Map size={18} /> My Map
            </a>
            <a href="#" className="flex items-center gap-3 hover:text-blue-600">
              <Bookmark size={18} /> Saved
            </a>
            <a
              href="/blog"
              className="flex items-center gap-3 hover:text-blue-600"
            >
              <Globe size={18} /> World Feed
            </a>
          </nav>

          <div className="mt-auto pt-10 border-t border-gray-100">
            <a
              href="#"
              className="flex items-center gap-3 text-gray-600 hover:text-red-500"
            >
              <LogOut size={18} /> Logout
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="bg-gray-100 flex-1 px-10 py-8 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              Explore The Globe
            </h2>
            <p className="text-gray-500 text-sm">
              Discover more about the places you love!
            </p>
          </div>

          {/* Tabs */}
          <div className=" flex w-full flex-col items-center gap-4 mb-6">
            <div className="flex gap-8">
              {" "}
              <button className="text-blue-600 border-b-2 border-black pb-1">
                Continents
              </button>
              <button className="text-gray-600 hover:text-black cursor-pointer">
                Countries
              </button>
            </div>

            <input
              type="text"
              placeholder="Search Places"
              className=" border rounded-lg px-4 py-2 text-sm w-full text-gray-700"
            />
          </div>

          {/* Blog Cards */}
          <div>
            <ContCrd handleSelect={handleSelect} />
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-96 h-screen border-l shadow-md bg-gray-100 p-6 hidden lg:block overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              {selectedContinent || "Select a continent"} Countries{" "}
            </h3>
          </div>

          {selectedContinent && countriesByContinent[selectedContinent] && (
            <div className="flex flex-col gap-4">
              {countriesByContinent[selectedContinent].map((country) => (
                <div
                  key={country.name}
                  className="flex gap-3 shadow-xs w-full h-32 p-4 cursor-pointer bg-white rounded-md"
                  onClick={() => {
                    router.push(`/Info/${encodeURIComponent(country.name)}`);
                  }}
                >
                  <Image
                    src={country.flag}
                    width={100}
                    height={600}
                    alt={`${country.name.common} flag`}
                    className="rounded-lg object-cover h-24"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800 leading-tight">
                      {country.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {country.capital}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
