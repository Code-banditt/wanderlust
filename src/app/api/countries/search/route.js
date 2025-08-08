import { NextResponse } from "next/server";
import cities from "@/data/top_150_cities";
export const dynamic = "force-dynamic";

const NINJA_API_KEY = process.env.NINJA_API_KEY;

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query || query.length < 1) {
    return NextResponse.json({ results: [] });
  }

  try {
    // Fetch matching countries (name + flag only)
    const countryRes = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags"
    );
    const allCountries = await countryRes.json();

    const matchedCountries = allCountries
      .filter((c) => c.name.common.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5)
      .map((c) => ({
        type: "country",
        name: c.name.common,
        flag: c.flags?.svg || c.flags?.png,
      }));

    // Fetch matching cities

    const matchedCities = Array.isArray(cities)
      ? cities
          .filter(
            (c) =>
              c.name.toLowerCase().includes(query) ||
              c.country.toLowerCase().includes(query)
          )
          .map((c) => ({
            type: "city",
            name: c.name,
            country: c.country,
            lat: c.lat,
            lng: c.lng,
          }))
      : [];

    const results = [...matchedCities, ...matchedCountries]; // matchedCountries should be defined somewhere
    results.sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name

    return NextResponse.json({ results });
  } catch (err) {
    console.error("❌ Search failed:", err);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
