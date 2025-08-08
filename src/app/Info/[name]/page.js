"use client";

import Image from "next/image";
import Button from "@/app/_components/Button";
import { ArrowRight } from "lucide-react";
import InfoModal from "@/app/_components/modalforInfo";
import ImageCarousel from "@/app/_components/InfoCarousel";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCountryInfo } from "@/app/store/CountrySlice";
import { useParams } from "next/navigation";
import { FaCloud } from "react-icons/fa";
import WanderlustLoader from "@/app/_components/wanderlustLoder";
import HeaderMinimal from "@/app/_components/HeaderMinimal";
import CountryStatsTable from "@/app/_components/countrystats";
import { useLoading } from "@/app/_components/Loading";

export default function ScenicIcelandPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const countryName = params.name;
  const { countryinfo, status } = useSelector((state) => state.country);
  const [userCount, setUserCount] = useState(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    if (countryName) {
      dispatch(fetchCountryInfo(countryName));
    }
  }, [dispatch, countryName]);

  useEffect(() => {
    setUserCount(Math.floor(Math.random() * 10000));
  }, []);

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status, setLoading]);

  if (status === "failed") return <p>Failed to load country info.</p>;
  console.log("✅ CountryInfo state:", countryinfo);

  return (
    <div className="w-full bg-white min-h-screen font-sans">
      <HeaderMinimal />

      <main className="max-w-7xl mx-auto px-10 py-16">
        <div className="mb-4 flex flex-wrap items-center gap-4 text-sm">
          <span className="border px-3 py-1 rounded-full">
            {countryinfo.name}
          </span>
          <span className="border px-3 py-1 rounded-full">
            population :{" "}
            <strong>{countryinfo.population?.toLocaleString() || "N/A"}</strong>
          </span>
          <span className="border px-3 py-1 rounded-full">
            {countryinfo.region}
          </span>
          <span className="border px-3 py-1 rounded-full">
            capital: <strong>{countryinfo.Capital}</strong>
          </span>
          <span className="border px-3 py-1 rounded-full">
            currency: <strong>{countryinfo.currency?.name}</strong>
          </span>
        </div>
        <h2 className="text-6xl font-bold leading-tight mb-4">
          {countryinfo.name}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold">
                About {countryinfo.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {countryinfo.description}
              </p>
            </div>
            {/*flag*/}
            <div className="flex items-center gap-2">
              {countryinfo?.flag?.startsWith("http") && (
                <Image
                  src={countryinfo.flag}
                  width={50}
                  height={50}
                  alt="flag"
                  className="rounded-md"
                />
              )}
              <span className="text-sm text-gray-600">
                {userCount} users have visited {countryinfo.name}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 text-sm">
              <InfoModal>Security Index</InfoModal>
              <InfoModal>Hotel&Suites</InfoModal>
              <InfoModal>Cities</InfoModal>
              <InfoModal>Caution</InfoModal>
            </div>
          </div>

          {countryinfo.images?.length > 0 && (
            <div className="relative">
              <Image
                src={countryinfo.images[6].url}
                width={600}
                height={400}
                className="rounded-xl object-cover w-full h-[300px]"
                alt={`${countryinfo.name} main`}
              />
              <div className="absolute top-4 left-4 bg-white rounded-full px-3 py-1 text-xs shadow">
                Photo by - <strong>{countryinfo.images[0].photographer}</strong>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              {" "}
              <FaCloud className="w-4 h-4" />
              <strong>Temperature:</strong> {countryinfo.weather?.temperature}
            </p>
            <Button className="rounded-full w-fit px-5 py-2 flex items-center gap-1">
              Full Details <ArrowRight className="w-4 h-4" />
            </Button>

            <div>
              <ImageCarousel data={countryinfo} />
            </div>
          </div>
        </div>

        <div>
          <CountryStatsTable countryinfo={countryinfo} />
        </div>
      </main>
    </div>
  );
}
