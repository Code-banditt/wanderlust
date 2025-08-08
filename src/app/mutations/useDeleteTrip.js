import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tripId) => {
      const res = await fetch(`/api/trips/${tripId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete trip");
      return res.json();
    },
    onSuccess: () => {
      // Invalidate the trips list cache
      queryClient.invalidateQueries(["trips"]);
    },
  });
};
