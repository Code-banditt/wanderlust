// utils/fetchTrip.js
export const fetchTrip = async (id) => {
  const res = await fetch(`/api/trips/${id}`);
  if (!res.ok) throw new Error("Failed to fetch trip");
  const data = await res.json();
  return data.trip;
};
