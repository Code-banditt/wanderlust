import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useAddHotel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tripId, stay }) => {
      const res = await fetch(`/api/TripHotel/${tripId}`, {
        method: "PATCH",
        headers: {
          "content-type": "applictaion/json",
        },
        body: JSON.stringify({
          stay: { stay },
        }),
      });

      if (!res.ok) throw new Error("failed to add place");
      return res.json();
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries(["stay", data.trip_id]);
    },
  });
};
