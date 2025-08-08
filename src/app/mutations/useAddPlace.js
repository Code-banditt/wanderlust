import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddPlace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tripId, place }) => {
      const res = await fetch(`/api/trips/${tripId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          places: [place],
        }),
      });

      if (!res.ok) throw new Error("Failed to add place");
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["trip", data.trip._id]);
    },
  });
};
