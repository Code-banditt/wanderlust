import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

const REST_COUNTRIES_API = "https://restcountries.com/v3.1/name";

//FUNCTION
export async function GET(request, { params }) {
  const name = await params.name;

  try {
    //fetch country
    const countryRes = await fetch(`${REST_COUNTRIES_API}/${name}`);
    const countryData = await countryRes.json();
    const country = countryData[0];
    const countryCode = country.cca2 || "US"; // fallback to US

    const lat = country?.capitalInfo?.latlng[0];
    const lng = country?.capitalInfo?.latlng[1];
    const Capital = country?.capital?.[0] || "Unknown";

    // Fetch weather from Open-Meteo
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`
    );
    const weatherData = await weatherRes.json();

    //api country stats
    const countryFactsRes = await fetch(
      `https://api.api-ninjas.com/v1/country?name=${country.name.common}`,
      {
        headers: {
          "X-Api-Key": "6DsacnH7fnzfvjUuAoIR9Q==q7xOQVOclL16HJAH",
        },
      }
    );

    const countryFacts = await countryFactsRes.json();
    console.log("API Ninjas Country Facts:", countryFacts);

    //reverse geo coding
    const reverseGeoRes = await fetch(
      "https://api.api-ninjas.com/v1/reversegeocoding?lat=48.8566&lon=2.3522",
      {
        headers: {
          "X-Api-Key": "6DsacnH7fnzfvjUuAoIR9Q==q7xOQVOclL16HJAH",
        },
      }
    );

    const reverseGeoData = await reverseGeoRes.json();
    console.log(reverseGeoData);

    //api images
    // fetch city images from Pixabay
    let images = [];
    try {
      const imageRes = await fetch(
        `https://pixabay.com/api/?key=${
          process.env.NEXT_PUBLIC_PIXABAY_KEY
        }&q=${encodeURIComponent(Capital)}&image_type=photo&per_page=10`
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

    // 🔍 Google events using SerpAPI
    let events = [];

    try {
      const eventsRes = await fetch(
        `https://serpapi.com/search.json?engine=google_events&q=Events+in+${encodeURIComponent(
          Capital
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

    //fetch hotels and places using GeoDB
    // 🏨 Google Hotels (via SerpAPI)
    let hotels = [];

    try {
      const hotelsRes = await fetch(
        `https://serpapi.com/search.json?engine=google_hotels&q=${encodeURIComponent(
          Capital
        )}&check_in_date=2025-07-15&check_out_date=2025-07-16&adults=2&currency=USD&gl=${countryCode}&hl=en&api_key=${
          process.env.SERPAPI_KEY
        }`
      );

      const hotelData = await hotelsRes.json();

      hotels =
        hotelData.hotels_results?.map((hotel) => ({
          name: hotel.name,
          address: hotel.address,
          rating: hotel.rating,
          price: hotel.price,
          thumbnail: hotel.thumbnail,
          link: hotel.link,
        })) || [];
    } catch (err) {
      console.error("🏨 Google Hotels fetch failed:", err);
    }

    const result = {
      name: country.name.common,
      region: country.region,
      population: country.population,
      Capital,
      flag: country.flags?.png,
      location: { lat, lng },
      currency: Object.values(country.currencies || {})[0]?.name || "Unknown",
      weather: {
        temperature: weatherData.current?.temperature_2m,
        windSpeed: weatherData.current?.wind_speed_10m,
      },

      ...countryFacts[0],
      reverseGeoData,
      images, // city images from Pixabay
      events, // events data from SerpAPI
      hotels, // hotels data from SerpAPI
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error("🌍 Country data fetch failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch country data." },
      { status: 500 }
    );
  }
}
