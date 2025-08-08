import { useQuery } from "@tanstack/react-query";

export const useFetchTrips = () => {
  return useQuery({
    queryKey: ["userTrips"],

    queryFn: async () => {
      const res = await fetch("/api/trips/get");
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to fetch trips");

      return data.data; // this is the array of trips
    },

    staleTime: 1000 * 60 * 2, // optional: 2 mins
  });
};
