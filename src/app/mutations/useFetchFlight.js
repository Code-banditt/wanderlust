import { useQuery } from "@tanstack/react-query";

export const useFetchFlight = ({
  departureId,
  arrivalId,
  outboundDate,
  returnDate,
}) => {
  const query = useQuery({
    queryKey: ["flights", departureId, arrivalId, outboundDate, returnDate],
    queryFn: async () => {
      const res = await fetch("/api/flights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          departureId,
          arrivalId,
          outboundDate,
          returnDate,
        }),
      });
      return res.json();
    },
    enabled: !!departureId && !!arrivalId && !!outboundDate && !!returnDate, // only runs if all exist
  });

  return query;
};
