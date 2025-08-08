// app/api/flights/route.js (Next 13+ App Router)
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function POST(req) {
  const { departureId, arrivalId, outboundDate, returnDate } = await req.json();

  try {
    const flightRes = await fetch(
      `https://serpapi.com/search.json?engine=google_flights&departure_id=${departureId}&arrival_id=${arrivalId}&outbound_date=${outboundDate}&return_date=${returnDate}&currency=USD&hl=en&api_key=${process.env.SERPAPI_KEY}`
    );

    const data = await flightRes.json();
    const results = data.flight_results || [];

    return NextResponse.json({ flights: results });
  } catch (err) {
    console.error("🛫 Flight fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch flights" },
      { status: 500 }
    );
  }
}
