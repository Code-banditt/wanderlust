import { NextResponse } from "next/server";
import cities from "@/data/top_150_cities";
export const dynamic = "force-dynamic";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = (searchParams.get("query") || "").trim();

  if (!query) return NextResponse.json({ results: [] });

  const q = query.toLowerCase();

  try {
    // Fetch countries (name may be an object: { common, official })
    const countryRes = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags"
    );
    const allCountries = await countryRes.json();

    const matchedCountries = (Array.isArray(allCountries) ? allCountries : [])
      .map((c) => {
        // Normalize name: if it's an object, use .common, otherwise use it as string
        const name = typeof c.name === "string" ? c.name : c.name?.common || "";
        return {
          type: "country",
          name,
          flag: c.flags?.svg || c.flags?.png || null,
        };
      })
      .filter((c) => c.name && c.name.toLowerCase().includes(q))
      .slice(0, 5);

    // Match local cities safely
    const matchedCities = Array.isArray(cities)
      ? cities
          .filter((c) => {
            const cityName = String(c.name || "").toLowerCase();
            const countryName = String(c.country || "").toLowerCase();
            return cityName.includes(q) || countryName.includes(q);
          })
          .map((c) => ({
            type: "city",
            name: c.name,
            country: c.country,
            lat: c.lat,
            lng: c.lng,
          }))
          .slice(0, 5)
      : [];

    const results = [...matchedCities, ...matchedCountries];
    results.sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json({ results });
  } catch (err) {
    console.error("❌ Search failed:", err);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
