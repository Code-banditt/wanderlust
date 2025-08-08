import { NextResponse } from "next/server";
import cities from "@/data/top_150_cities";
export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const name = await params.name;

  try {
    //fetch city data from local JSON
    const matched = cities.find((c) => c.name === name);

    if (!matched) {
      return NextResponse.json({ error: "City not found." }, { status: 404 });
    }

    const city = matched;

    // Fetch images from Pixabay
    let images = [];
    try {
      const imageRes = await fetch(
        `https://pixabay.com/api/?key=${
          process.env.NEXT_PUBLIC_PIXABAY_KEY
        }&q=${encodeURIComponent(city.name)}&image_type=photo&per_page=16`
      );
      const imageData = await imageRes.json();
      images =
        imageData.hits?.map((img) => ({
          id: img.id,
          url: img.webformatURL,
          tags: img.tags,
          photographer: img.user,
        })) || [];
    } catch (err) {
      console.error("📷 Pixabay image fetch failed:", err);
    }

    // Fetch TripAdvisor hotels
    let tripAdvisorHotels = [];

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000); // 10 seconds

      const tripRes = await fetch(
        `https://tripadvisor-scraper.p.rapidapi.com/hotels/search?query=${encodeURIComponent(
          city.name
        )}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "tripadvisor-scraper.p.rapidapi.com",
            "x-rapidapi-key":
              "44293e9dbfmsha5220aea78736f7p128fd8jsna19e51963ea8",
          },
          signal: controller.signal,
        }
      );

      clearTimeout(timeout); // Clear the timer if fetch completes in time

      const tripData = await tripRes.json();

      if (Array.isArray(tripData)) {
        tripAdvisorHotels = tripData.map((hotel) => ({
          name: hotel.name,
          type: hotel.type,
          price: hotel.price,
          lat: hotel.latitude,
          lng: hotel.longitude,
          link: hotel.link,
          image: hotel.thumbnail_url,
          id: hotel.tripadvisor_id,
        }));
      } else {
        console.warn("⚠️ TripAdvisor response unexpected:", tripData);
      }
    } catch (err) {
      if (err.name === "AbortError") {
        console.error("⏱️ TripAdvisor fetch timed out after 2 minutes.");
      } else {
        console.error("🏨 TripAdvisor fetch failed:", err.message);
      }
    }

    // If no hotels found, use a default message
    if (tripAdvisorHotels.length === 0) {
      tripAdvisorHotels = [
        {
          name: "No hotels found",
          type: "N/A",
          price: "N/A",
          lat: city.lat,
          lng: city.lng,
          link: "",
          image: "",
          id: "",
        },
      ];
    }

    // Fetch events from Google Events API

    let events = [];

    try {
      const eventsRes = await fetch(
        `https://serpapi.com/search.json?engine=google_events&q=Events+in+${encodeURIComponent(
          city.name
        )}&hl=en&gl=us&api_key=${process.env.SERPAPI_KEY}`
      );
      const eventsData = await eventsRes.json();

      events =
        eventsData.events_results?.map((event) => ({
          title: event.title,
          date: event.date?.start_date || "TBD",
          description: event.description,
          address: event.address,
          link: event.link,
          thumbnail: event.thumbnail,
        })) || [];
    } catch (err) {
      console.error("🎫 Google Events fetch failed:", err);
    }

    //flight fetch
    const res = await fetch(
      `https://booking-com18.p.rapidapi.com/flights/v2/auto-complete?query=${name}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "booking-com18.p.rapidapi.com",
          "x-rapidapi-key":
            "44293e9dbfmsha5220aea78736f7p128fd8jsna19e51963ea8", // keep it secure
        },
      }
    );

    const data = await res.json();

    // Filter CITY and AIRPORT types

    //hotels

    // Final response
    const result = {
      city: {
        name: city?.name || "Unknown",
        population: city?.population || "Unknown",
        is_capital: city?.is_capital ?? null,
        latitude: city?.lat,
        longitude: city?.lng,
        country: city?.country,
      },
      images,
      tripAdvisorHotels,

      events,
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error("🌍 Country data fetch failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch city data." },
      { status: 500 }
    );
  }
}
