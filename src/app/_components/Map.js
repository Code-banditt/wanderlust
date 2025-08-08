"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function Map({ countryInfo, zoom = 5 }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null); // store the map instance
  const [mapReady, setMapReady] = useState(false); // for conditional button use

  const hotelsLocation = useMemo(
    () =>
      countryInfo?.tripAdvisorHotels?.map((hotel) => ({
        longitude: hotel.lng,
        latitude: hotel.lat,
        name: hotel.name,
      })) || [],
    [countryInfo?.tripAdvisorHotels]
  );

  const longitude =
    countryInfo?.location?.lng ?? countryInfo?.city?.longitude ?? 2.3522;
  const latitude =
    countryInfo?.location?.lat ?? countryInfo?.city?.latitude ?? 48.8566;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style:
        "https://api.maptiler.com/maps/bright-v2/style.json?key=Kp7o6h8F0Fq7WQgtl99j",
      center: [longitude, latitude],
      zoom: zoom,
    });

    mapRef.current = map;
    setMapReady(true); // trigger button availability

    new maplibregl.Marker().setLngLat([longitude, latitude]).addTo(map);

    hotelsLocation.forEach((hotel) => {
      if (!hotel.longitude || !hotel.latitude) return;

      new maplibregl.Marker({ color: "#FF5A5F" })
        .setLngLat([hotel.longitude, hotel.latitude])
        .setPopup(
          new maplibregl.Popup({ offset: 25 }).setText(hotel.name || "Hotel")
        )
        .addTo(map);
    });

    return () => map.remove();
  }, [longitude, latitude, hotelsLocation, zoom]);

  const handleResetView = () => {
    if (!mapRef.current) return;
    mapRef.current.flyTo({
      center: [longitude, latitude],
      zoom: zoom,
      essential: true,
    });
  };

  return (
    <div className="relative w-full h-full rounded-lg shadow-lg">
      {/* Map container */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Reset View Button */}
      {mapReady && (
        <button
          onClick={handleResetView}
          className="absolute top-4 right-4 z-10 bg-white text-sm font-medium rounded-full shadow-md px-4 py-2 hover:bg-gray-100"
        >
          🧭 Back to City
        </button>
      )}
    </div>
  );
}
