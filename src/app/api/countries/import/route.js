import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Country from "@/models/countryModels";
export const dynamic = "force-dynamic";

const COUNTRY_API = " https://restcountries.com/v3.1/all";

async function fetchCountriesData() {
  const res = await fetch(COUNTRY_API);
  const data = await res.json();
  console.log("fetched data", data);

  if (!Array.isArray(data)) {
    console.error("Unexpected response:", data); // log for debugging
    throw new Error("Expected array from REST Countries API");
  }

  return data.map((country) => ({
    name: country.name.common,
    officialName: country.name.official,
    population: country.population,
    region: country.region,
    capital: country.capital?.[0] || "Unknown",
    flagImage: country.flags?.png || "",
    location: {
      lat: country.latlng?.[0] || 0,
      lng: country.latlng?.[1] || 0,
    },
    cities: [],
    image: `https://source.unsplash.com/featured/?${country.name.common}`,
    securityIndex: null,
    description: `${country.name.common} is a country in ${country.region}`,
  }));
}

export async function GET() {
  try {
    // ✅ Moved inside GET to avoid top-level await
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    const countries = await fetchCountriesData();

    await Country.deleteMany({});
    await Country.insertMany(countries);

    return NextResponse.json({
      message: "Countries imported successfully!",
      count: countries.length,
    });
  } catch (error) {
    console.error("Error uploading country data:", error);
    return NextResponse.json(
      { error: "Failed to upload country data" },
      { status: 500 }
    );
  }
}
