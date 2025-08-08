import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeletePlaces = (tripId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (placeName) => {
      const response = await fetch(`/api/trip/${tripId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ placeName }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete place");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Removed");
      queryClient.invalidateQueries(["trip", tripId]);
    },
  });
};
