import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital,region,cca2,flags"
    );
    const data = await res.json();

    // Group countries by continent
    const continents = {};

    data.forEach((country) => {
      const region = country.region || "Unknown";
      if (!continents[region]) {
        continents[region] = [];
      }
      continents[region].push({
        name: country.name.common,
        cca2: country.cca2,
        capital: country.capital?.[0],
        flag: country.flags?.svg,
      });
    });

    return NextResponse.json(continents);
  } catch (err) {
    console.error("🌍 Country list fetch failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch countries." },
      { status: 500 }
    );
  }
}
